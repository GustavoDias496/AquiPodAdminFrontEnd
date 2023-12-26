import { useState } from "react";
import icon from "../../assets/icon.jpg";
import styles from "./styles.module.css";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";


const schema = yup.object({
    userEmail: yup.string().email().required("O email é obrigatório!"),
    userPassword: yup.string().required("A senha é obrigatória!"),
  }).required();

type FormData = yup.InferType<typeof schema>;


export function Login() {
  let history = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const { register, handleSubmit: onSubmit, getValues, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema) 
});

const handleSubmit = () => {
    setIsSubmit(true);
    const userEmail = getValues("userEmail");
    const userPassword = getValues("userPassword");
    console.log(userEmail)
    console.log(userPassword)

    api.post('/users/login', {
        email: userEmail,
        password: userPassword
    }).then((res) => {
        setIsSubmit(true)
        reset();

        // Armazenar o token no sessionStorage
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('auth', res.data.auth);
        history('/home')
    }).catch((error:any) => {
        console.error(error.response.data);
    }).finally(() => {
        setIsSubmit(false);
    })
}


  return (
    <div className={styles.container}>
      <img
        className={styles.icon}
        src={icon}
        alt=""
        width="150px"
        height="150px"
      />
      <form onSubmit={onSubmit(handleSubmit)} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email:</label>
          <input
            placeholder="Digite seu email"
            type="text"
            className={styles.input}
            {...register("userEmail")}
          />
          {errors.userEmail && <p className={styles.inputError}>{errors.userEmail.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Senha:</label>
          <input
            placeholder="Digite sua senha"
            type="text"
            className={styles.input}
            {...register("userPassword")}
          />
          {errors.userPassword && <p className={styles.inputError}>{errors.userPassword.message}</p>}
        </div>

        <button className={styles.button}>
          {isSubmit ? (
            <>
              <div className={styles.loader}></div>Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </div>
  );
}
