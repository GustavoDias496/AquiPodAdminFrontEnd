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
import { Editor } from "@tinymce/tinymce-react";

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
    supportersName: yup.string().required("O nome é obrigatório!"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export function SupportersForm() {
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
  const [editorContent, setEditorContent] = useState("");


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setIsImageUploaded(true);
    }
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    const supportersName = getValues("supportersName");
    const supportersDescription = editorContent;

    api
      .post(
        "/supporters",
        {
          name: supportersName,
          description: supportersDescription,
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
      className={`${styles.formContainer} ${styles.supportersFormContainer}`}
    >
      <div className={styles.inputContainer}>
        <label className={styles.label}>Nome:</label>
        <input
          {...register("supportersName")}
          type="text"
          className={styles.input}
        />
        {errors.supportersName && (
          <p className={styles.inputError}>{errors.supportersName.message}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Descrição:</label>
        <Editor
          apiKey="epc699ptf3hs9nf9q1hph1m0vdtbr2h7ruq6icz96isofrqp"
          init={{
            height: 450,
            width: 800,
            plugins:
              "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (_request:any, respondWith:any) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
          initialValue=""
          value={editorContent}
          onEditorChange={(content) => setEditorContent(content)} 
        />
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

      <button className={`${styles.button} ${styles.buttonSupporters}`}>
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
