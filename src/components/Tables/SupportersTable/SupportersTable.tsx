import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from "../../../global/styles/tables.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export type ISupporters = {
  id: number;
  name: string;
  description: string;
};

export function SupportersTable() {
  const [supporters, setSupporters] = useState<ISupporters[]>([]);
  const sucessNotify = () => toast("Apoiador excluido com sucesso!");
  const errorNotify = () => toast("Erro: Apoiador vinculado a outro dado!");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api
      .get("/supporters")
      .then((response) => {
        setSupporters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = (id: number) => {
    api
      .delete(`/supporters/${id}`)
      .then((res) => {
        console.log(res);
        sucessNotify();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        errorNotify();
      });
  };

  const renderContent = () => {
    if (supporters.length > 0) {
      return supporters.map((supporter, index) => (
        <tr key={index}>
          <th className={styles.th}>{supporter.name}</th>
          <th className={styles.th}>Clique em editar para visualizar</th>
          <th className={styles.th}>
            <Link to={`/editsupporters/${supporter.id}`}>
              <AiFillEdit color="blue" />
            </Link>
          </th>
          <th className={styles.th} onClick={() => deleteData(supporter.id)}>
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

  return (
    <>
      <table className={styles.table}>
        <thead>
          <th className={styles.th}>Nome</th>
          <th className={styles.th}>Description</th>
          <th className={styles.th}>Editar</th>
          <th className={styles.th}>Excluir</th>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
      <Toaster position="bottom-left" />
    </>
  );
}
