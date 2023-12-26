import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from '../../../global/styles/tables.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

export type ICategory = {
    id: number;
    name: string;
}

export function CategoryTable(){
    const [categorys, setCategorys] = useState<ICategory[]>([]);
    const sucessNotify = () => toast('Categoria excluido com sucesso!');
    const errorNotify = () => toast('Erro: Categoria vinculado a outro dado!');

    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = () => {
        api.get('/categorys')
        .then((response) =>{
            setCategorys(response.data);
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    const deleteData = (id:number) => {
        api.delete(`/categorys/${id}`)
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
        if (categorys.length > 0) {
          return categorys.map((category, index) => (
            <tr key={index}>
              <th className={styles.th}>{category.name}</th>
              <th className={styles.th}>
                <Link to={`/editcategory/${category.id}`}>
                  <AiFillEdit color="blue" />
                </Link>
              </th>
              <th className={styles.th} onClick={() => deleteData(category.id)}>
                <AiFillDelete color="red" className={styles.deleteIcon} />
              </th>
            </tr>
          ));
        }
        return (
          <tr>
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