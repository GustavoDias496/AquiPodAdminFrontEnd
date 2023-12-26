import { BiCategory } from "react-icons/bi";
import { Sidebar } from "../../components/sidebar/sidebar";
import styles from '../../global/styles/pages.module.css';
import Tabs from "../../components/Tabs/Tabs";
import { FinalistEditForm } from "../../components/EditForms/FinalistEditForm/FinalistEditForm";
export function EditFinalist(){

    const itens = [
        {
          title: "Finalista",
          component: <FinalistEditForm />,
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