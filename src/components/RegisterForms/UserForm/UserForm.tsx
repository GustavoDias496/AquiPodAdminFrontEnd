import styles from '../../../global/styles/form.module.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const schema = yup.object({
    userName: yup.string().required("O nome é obrigatório!"),
    userEmail: yup.string().email().required("O email é obrigatório!"),
    userPassword: yup.string().required("A senha é obrigatória!"),
    confirmPassword: yup.string()
      .test('passwords-match', 'As senhas devem coincidir', function (value) {
        return this.parent.userPassword === value;
      })
      .required('A confirmação de senha é obrigatória'),
  }).required();

type FormData = yup.InferType<typeof schema>;


export function UserForm(){

    const { register, handleSubmit: onSubmit, getValues, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) 
    });

    const successNotify = () => toast('Cadastrado com sucesso!');
    const errorNotify = () => toast('Erro ao cadastrar!');
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = () => {
        setIsSubmit(true);
        const userName = getValues("userName");
        const userEmail = getValues("userEmail");
        const userPassword = getValues("userPassword");

        api.post('/users', {
            name: userName,
            email: userEmail,
            password: userPassword
        }).then(() => {
            setIsSubmit(true)
            successNotify();
            reset();
        }).catch((error:any) => {
            errorNotify();
            console.error(error.response.data);
        }).finally(() => {
            setIsSubmit(false);
        })
    }

    return(
        <form onSubmit={onSubmit(handleSubmit)} className={styles.formContainer}>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Nome:</label>
                <input {...register("userName")} type="text" className={styles.input}/>
                {errors.userName && <p className={styles.inputError}>{errors.userName.message}</p>}
            </div>

            <div className={styles.inputContainer}>
                <label className={styles.label}>Email:</label>
                <input {...register("userEmail")} type="email" className={styles.input}/>
                {errors.userEmail && <p className={styles.inputError}>{errors.userEmail.message}</p>}
            </div>

            <div className={styles.inputContainer}>
                <label className={styles.label}>Senha:</label>
                <input {...register("userPassword")} type="password" className={styles.input}/>
                {errors.userPassword && <p className={styles.inputError}>{errors.userPassword.message}</p>}
            </div>

            <div className={styles.inputContainer}>
                <label className={styles.label}>Confirmar senha:</label>
                <input {...register("confirmPassword")} type="password"  className={styles.input}/>
                {errors.confirmPassword && <p className={styles.inputError}>{errors.confirmPassword.message}</p>}
            </div>

            <button className={styles.button}>
            {isSubmit ? (
                <><div className={styles.loader}></div>Enviando...</>
            ) : (
                'Enviar' 
            )}
            </button>
            <Toaster 
                position='bottom-left'
            />
        </form>
    )
}