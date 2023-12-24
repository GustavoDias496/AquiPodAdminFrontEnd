import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from '../../../global/styles/tables.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

export type IEpisode = {
    id: number;
    name: string;
}

export function FinalistTable(){
    const [finalists, setFinalists] = useState<IEpisode[]>([]);
    const sucessNotify = () => toast('Finalista excluido com sucesso!');
    const errorNotify = () => toast('Erro: Finalista vinculado a outro dado!');

    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = () => {
        api.get('/finalist')
        .then((response) =>{
            setFinalists(response.data);
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    const deleteData = (id:number) => {
        api.delete(`/finalist/${id}`)
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

    const renderFinalists = finalists.map((finalist, index) =>{
        return(
                <tr key={index}>
                    <th className={styles.th} >{finalist.name}</th>
                    <th className={styles.th} ><Link to={`/edituser/${finalist.id}`}><AiFillEdit/></Link></th>
                    <th className={styles.th} onClick={() => deleteData(finalist.id)} ><AiFillDelete color="red" className={styles.deleteIcon}/></th>
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
                    {renderFinalists}
                </tbody>
            </table>
            <Toaster 
                position='bottom-left'
            />
        </>
    )
}