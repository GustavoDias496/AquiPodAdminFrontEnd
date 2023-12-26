import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from '../../../global/styles/tables.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

export type IEpisode = {
    id: number;
    name: string;
    categoryId: number;
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

    const renderContent = () => {
        if (finalists.length > 0) {
          return finalists.map((finalist, index) => (
            <tr key={index}>
              <th className={styles.th}>{finalist.name}</th>
              <th className={styles.th}>{finalist.categoryId}</th>
              <th className={styles.th}>
                <Link to={`/editfinalist/${finalist.id}`}>
                <AiFillEdit color="blue" />
                </Link>
              </th>
              <th className={styles.th} onClick={() => deleteData(finalist.id)}>
                <AiFillDelete color="red" className={styles.deleteIcon} />
              </th>
            </tr>
          ));
        }
        return (
          <tr>
            <th className={styles.th}>Você</th>
            <th className={styles.th}>Não</th>
            <th className={styles.th}>Tem</th>
            <th className={styles.th}>Dados</th>
          </tr>
        );
      };

    return(
        <>
            <table className={styles.table}>
                <thead >
                    <th className={styles.th}>Nome</th>
                    <th className={styles.th}>Categoria</th>
                    <th className={styles.th}>Editar</th>
                    <th className={styles.th}>Excluir</th>
                </thead>
                <tbody>
                    {renderContent()}
                </tbody>
            </table>
            <Toaster 
                position='bottom-left'
            />
        </>
    )
}