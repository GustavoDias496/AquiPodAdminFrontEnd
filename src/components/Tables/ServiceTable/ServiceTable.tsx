import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from '../../../global/styles/tables.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

export type IEpisode = {
    id: number;
    name: string;
    description: string;
}

export function ServiceTable(){
    const [services, setServices] = useState<IEpisode[]>([]);
    const sucessNotify = () => toast('Serviço excluido com sucesso!');
    const errorNotify = () => toast('Erro: Serviço vinculado a outro dado!');

    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = () => {
        api.get('/services')
        .then((response) =>{
            setServices(response.data);
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    const deleteData = (id:number) => {
        api.delete(`/services/${id}`)
        .then((res) => {
            console.log(res);
            sucessNotify();
            fetchData(); 
        })
        .catch((error) => {
            console.log(error);
            errorNotify();
        });
    }

    const renderServices = services.map((service, index) =>{
        return(
                <tr key={index}>
                    <th className={styles.th} >{service.name}</th>
                    <th className={styles.th} ><Link to={`/edituser/${service.id}`}><AiFillEdit/></Link></th>
                    <th className={styles.th} onClick={() => deleteData(service.id)} ><AiFillDelete color="red" className={styles.deleteIcon}/></th>
                </tr>
        )
    })

    return(
        <>
            <table className={styles.table}>
                <thead >
                    <th className={styles.th}>Nome</th>
                    <th className={styles.th}>Editar</th>
                    <th className={styles.th}>Excluir</th>
                </thead>
                <tbody>
                    {renderServices}
                </tbody>
            </table>
            <Toaster 
                position='bottom-left'
            />
        </>
    )
}