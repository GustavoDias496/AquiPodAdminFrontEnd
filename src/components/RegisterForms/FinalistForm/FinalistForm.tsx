import styles from '../../../global/styles/form.module.css';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
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
    finalistName: yup.string().required("O nome é obrigatório!"),
    categoryId: yup.string().required("A categoria é obrigatória!"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

type ICategory = {
  id: number;
  name: string;
};

export function FinalistForm() {
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
  const [categorys, setCategorys] = useState<ICategory[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setIsImageUploaded(true);
    }
  };

  useEffect(() => {
    api
      .get("/categorys")
      .then((res) => {
        setCategorys(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    setIsSubmit(true);
    const finalistName = getValues("finalistName");
    const categoria = getValues("categoryId");

    api
      .post(
        "/finalist",
        {
          name: finalistName,
          categoryId: parseInt(categoria),
          document: image,
        },
        {
          headers: {
            Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyMzQ2Njc3fQ.JVmkjlE70QyFAZ10NgPV586yCtHsJBSDFfEWLBGGsIQ",
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
          {...register("finalistName")}
          type="text"
          className={styles.input}
        />
        {errors.finalistName && (
          <p className={styles.inputError}>{errors.finalistName.message}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Lider do setor:</label>
        <select className={styles.input} {...register("categoryId")}>
          <option className={styles.input}>Selecione uma categoria</option>
          {categorys.map((category) => (
            <option
              className={styles.option}
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className={styles.inputError}>{errors.categoryId.message}</p>
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
