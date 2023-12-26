import { BiCategory } from "react-icons/bi";
import { Sidebar } from "../../components/sidebar/sidebar";
import styles from '../../global/styles/pages.module.css';
import Tabs from "../../components/Tabs/Tabs";
import { SupportersEditForm } from "../../components/EditForms/SupportersEditForm/SupportersEditForm";
export function EditSupporters(){

    const itens = [
        {
          title: "Apoiadores",
          component: <SupportersEditForm />,
          icon: <BiCategory />,
          height: "90vh"
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