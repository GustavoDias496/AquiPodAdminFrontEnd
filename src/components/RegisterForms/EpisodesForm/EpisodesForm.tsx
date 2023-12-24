import styles from '../../../global/styles/form.module.css';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

export function EpisodesForm() {
  const {
    register,
    handleSubmit: onSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const successNotify = () => toast("Cadastrado com sucesso!");
  const errorNotify = () => toast("Erro ao cadastrar!");
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setIsImageUploaded(true);
    }
  };


  const handleSubmit = () => {
    setIsSubmit(true);
    const episodeName = getValues("episodeName");
    const episodeLink = getValues("episodeLink");

    
    api
      .post(
        "/episodes",
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
        reset();
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
    <form onSubmit={onSubmit(handleSubmit)} encType="multipart/form-data" className={styles.formContainer}>
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
