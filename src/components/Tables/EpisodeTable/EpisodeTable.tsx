import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from '../../../global/styles/tables.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

export type IEpisode = {
    id: number;
    name: string;
    link: string;
}

export function EpisodeTable(){
    const [episodes, setEpisodes] = useState<IEpisode[]>([]);
    const sucessNotify = () => toast('Epsódio excluido com sucesso!');
    const errorNotify = () => toast('Erro: Episódio vinculado a outro dado!');

    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = () => {
        api.get('/episodes')
        .then((response) =>{
            setEpisodes(response.data);
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    const deleteData = (id:number) => {
        api.delete(`/episodes/${id}`)
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

    const renderEpisodes = episodes.map((episode, index) =>{
        return(
                <tr key={index}>
                    <th className={styles.th} >{episode.name}</th>
                    <th className={styles.th} ><Link to={`/edituser/${episode.id}`}><AiFillEdit/></Link></th>
                    <th className={styles.th} onClick={() => deleteData(episode.id)} ><AiFillDelete color="red" className={styles.deleteIcon}/></th>
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
                    {renderEpisodes}
                </tbody>
            </table>
            <Toaster 
                position='bottom-left'
            />
        </>
    )
}