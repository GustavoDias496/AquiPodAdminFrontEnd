import styles from "../../../global/styles/form.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { baseURL } from "../../../services/api";
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
    eventName: yup.string().required("O nome é obrigatório!"),
    eventActive: yup.string().required("Obrigatório!"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

type IEvent = {
    id: number;
    name: string;
    active: string;
    image: string;
  };

export function EventEditForm() {
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
  const errorNotify = () => toast("Erro ao atualizar!");
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IEvent>();
  console.log(data);

  const eventId = id ? parseInt(id, 10) : undefined;
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setIsImageUploaded(true);
    }
  };

  useEffect(() => {
    api
      .get(`event/${eventId}`)
      .then((res) => {
        setData(res.data);
        if (res.data) {
          reset({
            eventName: res.data.name,
            eventActive: res.data.active,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    setIsSubmit(true);
    const eventName = getValues("eventName");
    const eventActive = getValues("eventActive");
    console.log(eventActive)
    api
      .put(
        `/event/${eventId}`,
        {
          name: eventName,
          active: eventActive,
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
            eventName: eventName,
            eventActive: eventActive,
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
          {...register("eventName")}
          type="text"
          className={styles.input}
        />
        {errors.eventName && (
          <p className={styles.inputError}>{errors.eventName.message}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Ativo:</label>
        <select {...register("eventActive")} className={styles.input}>
          <option value={'active'}>Ativo</option>
          <option value={'disabled'}>Inativo</option>
        </select>

        {errors.eventActive && (
          <p className={styles.inputError}>{errors.eventActive.message}</p>
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
