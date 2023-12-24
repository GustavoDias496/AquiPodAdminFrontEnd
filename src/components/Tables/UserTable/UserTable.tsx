import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from '../../../global/styles/tables.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

export type IUser = {
    id: number;
    name: string;
    email: string;
}

export function UserTable(){
    const [users, setUsers] = useState<IUser[]>([]);
    const sucessNotify = () => toast('Usuário excluido com sucesso!');
    const errorNotify = () => toast('Erro: Usuário vinculado a outro dado!');

    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = () => {
        api.get('/users')
        .then((response) =>{
            setUsers(response.data);
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    const deleteData = (id:number) => {
        api.delete(`/users/${id}`)
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

    const renderUsers = users.map((user, index) =>{
        return(
                <tr key={index}>
                    <th className={styles.th} >{user.name}</th>
                    <th className={styles.th} >{user.email}</th>
                    <th className={styles.th} ><Link to={`/edituser/${user.id}`}><AiFillEdit/></Link></th>
                    <th className={styles.th} onClick={() => deleteData(user.id)} ><AiFillDelete color="red" className={styles.deleteIcon}/></th>
                </tr>
        )
    })

    return(
        <>
            <table className={styles.table}>
                <thead >
                    <th className={styles.th}>Nome</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Editar</th>
                    <th className={styles.th}>Excluir</th>
                </thead>
                <tbody>
                    {renderUsers}
                </tbody>
            </table>
            <Toaster 
                position='bottom-left'
            />
        </>
    )
}