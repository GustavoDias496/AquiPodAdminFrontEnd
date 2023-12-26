import styles from "../../../global/styles/form.module.css";
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
    eventName: yup.string().required("O nome é obrigatório!"),
    eventActive: yup.string().required("Obrigatório!"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export function EventForm() {
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
    const eventName = getValues("eventName");
    const eventActive = getValues("eventActive");
    api
      .post(
        "/event",
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
