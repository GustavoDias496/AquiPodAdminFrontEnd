import styles from "../../../global/styles/form.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../services/api";
import { baseURL } from "../../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


const schema = yup
  .object({
    episodeName: yup.string().required("O nome é obrigatório!"),
    episodeLink: yup.string().required("O link é obrigatório!"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

type IEpisode = {
  id: number;
  name: string;
  Link: string;
  image: string;
};

export function EpisodeEditForm() {
  const {
    register,
    handleSubmit: onSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const successNotify = () => toast("Atualizado com sucesso!");
  const errorNotify = () => toast("Erro ao atualizado!");
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IEpisode>();
  console.log(data);

  const episodeId = id ? parseInt(id, 10) : undefined;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setIsImageUploaded(true);
    }
  };

  useEffect(() => {
    api
      .get(`episodes/${episodeId}`)
      .then((res) => {
        setData(res.data);
        if (res.data) {
          reset({
            episodeName: res.data.name,
            episodeLink: res.data.link,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    setIsSubmit(true);
    const episodeName = getValues("episodeName");
    const episodeLink = getValues("episodeLink");

    api
      .put(
        `/episodes/${episodeId}`,
        {
          name: episodeName,
          link: episodeLink,
          document: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        setIsSubmit(true);
        successNotify();
        setIsImageUploaded(false);
        reset({
            episodeName: episodeName,
            episodeLink: episodeLink,
          });
      })
      .catch((error: any) => {
        errorNotify();
        console.error(error.response.data);
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };
  return (
    <form
      onSubmit={onSubmit(handleSubmit)}
      encType="multipart/form-data"
      className={styles.formContainer}
    >
      <div className={styles.inputContainer}>
        <label className={styles.label}>Nome:</label>
        <input
          {...register("episodeName")}
          type="text"
          className={styles.input}
        />
        {errors.episodeName && (
          <p className={styles.inputError}>{errors.episodeName.message}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Link do episódio:</label>
        <input
          {...register("episodeLink")}
          type="text"
          className={styles.input}
        />
        {errors.episodeLink && (
          <p className={styles.inputError}>{errors.episodeLink.message}</p>
        )}
      </div>

      <div className={styles.inputContainerImage}>
        {data?.image && (
          <img
            src={`${baseURL}/${data.image}`}
            alt="Descrição da imagem"
            className={styles.imagePreview}
            width="50px"
            height="50px"
          />
        )}
        <a
          href={`${baseURL}/${data?.image}`}
          download={data?.image}
          className={styles.downloadLink}
          target="_blank"
        >
          <FaCloudDownloadAlt color="#000" className={styles.downloadIcon} />
        </a>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Imagem:</label>
        <label htmlFor="image-upload" className={styles.uploadButton}>
          <VisuallyHiddenInput
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            {isImageUploaded ? "Imagem selecionada" : "Selecionar imagem"}
          </Button>
        </label>
      </div>

      <button className={styles.button}>
        {isSubmit ? (
          <>
            <div className={styles.loader}></div>Enviando...
          </>
        ) : (
          "Enviar"
        )}
      </button>
      <Toaster position="bottom-left" />
    </form>
  );
}