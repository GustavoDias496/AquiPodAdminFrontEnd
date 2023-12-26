import { BiCategory } from "react-icons/bi";
import { Sidebar } from "../../components/sidebar/sidebar";
import styles from '../../global/styles/pages.module.css';
import Tabs from "../../components/Tabs/Tabs";
import { UserEditForm } from "../../components/EditForms/UserEditForm/UserEditForm";
export function EditUser(){

    const itens = [
        {
          title: "Usuário",
          component: <UserEditForm />,
          icon: <BiCategory />,
        }
      ];

    return(
        <section className={styles.section}>
        <Sidebar />
        <div className={styles.container}>
            <Tabs itens={itens}/>
        </div>
      </section>
    )
}