import { BiCategory } from "react-icons/bi";
import { Sidebar } from "../../components/sidebar/sidebar";
import styles from '../../global/styles/pages.module.css';
import Tabs from "../../components/Tabs/Tabs";
import { ServiceEditForm } from "../../components/EditForms/ServiceEditForm/ServiceEditForm";
export function EditService(){

    const itens = [
        {
          title: "Serviço",
          component: <ServiceEditForm />,
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