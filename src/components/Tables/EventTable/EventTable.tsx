import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from "../../../global/styles/tables.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export type IEvent = {
  id: number;
  name: string;
  active: string;
};

export function EventTable() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const sucessNotify = () => toast("Evento excluido com sucesso!");
  const errorNotify = () => toast("Erro: Evento vinculado a outro dado!");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api
      .get("/event")
      .then((response) => {
       setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = (id: number) => {
    api
      .delete(`/event/${id}`)
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
    if (events.length > 0) {
      return events.map((event, index) => (
        <tr key={index}>
          <th className={styles.th}>{event.name}</th>
          <th className={styles.th}>{event.active}</th>
          <th className={styles.th}>
            <Link to={`/editevent/${event.id}`}>
            <AiFillEdit color="blue" />
            </Link>
          </th>
          <th className={styles.th} onClick={() => deleteData(event.id)}>
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
          <th className={styles.th}>Ativo</th>
          <th className={styles.th}>Editar</th>
          <th className={styles.th}>Excluir</th>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
      <Toaster position="bottom-left" />
    </>
  );
}
