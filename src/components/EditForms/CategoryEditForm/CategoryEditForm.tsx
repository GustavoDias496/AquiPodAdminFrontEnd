import styles from '../../../global/styles/form.module.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const schema = yup.object({
    categoryName: yup.string().required("O nome é obrigatório!")
  }).required();

type FormData = yup.InferType<typeof schema>;


type ICategory ={
    id: number;
    name: string;
}


export function CategoryEditForm(){

    const { register, handleSubmit: onSubmit, getValues, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) 
    });
    const { id } = useParams<{ id: string }>();

    const successNotify = () => toast('Atualizado com sucesso!');
    const errorNotify = () => toast('Erro ao atualizar!');
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState<ICategory>();
    console.log(data);

    const categoryId = id ? parseInt(id, 10) : undefined;

    useEffect(()=>{

        api.get(`categorys/${categoryId}`)
        .then((res) => {
            setData(res.data);
                if (res.data) {
                    reset({
                        categoryName: res.data.name,
                    });
                }
        })
        .catch((error) => {
            console.log(error);
        })

    }, []);


    const handleSubmit = () => {
        setIsSubmit(true);
        const categoryName = getValues("categoryName");

        api.put(`/categorys/${categoryId}`, {
            name: categoryName
        }).then(() => {
            setIsSubmit(true)
            successNotify();
            reset({
                categoryName: categoryName,
            });
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