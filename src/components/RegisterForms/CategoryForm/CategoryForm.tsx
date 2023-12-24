import styles from '../../../global/styles/form.module.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const schema = yup.object({
    categoryName: yup.string().required("O nome é obrigatório!")
  }).required();

type FormData = yup.InferType<typeof schema>;


export function CategoryForm(){

    const { register, handleSubmit: onSubmit, getValues, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) 
    });

    const successNotify = () => toast('Cadastrado com sucesso!');
    const errorNotify = () => toast('Erro ao cadastrar!');
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = () => {
        setIsSubmit(true);
        const categoryName = getValues("categoryName");

        api.post('/categorys', {
            name: categoryName
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
                <input {...register("categoryName")} type="text" className={styles.input}/>
                {errors.categoryName && <p className={styles.inputError}>{errors.categoryName.message}</p>}
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