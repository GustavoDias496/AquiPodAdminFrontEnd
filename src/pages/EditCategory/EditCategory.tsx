import { BiCategory } from "react-icons/bi";
import { CategoryEditForm } from "../../components/EditForms/CategoryEditForm/CategoryEditForm";
import { Sidebar } from "../../components/sidebar/sidebar";
import styles from '../../global/styles/pages.module.css';
import Tabs from "../../components/Tabs/Tabs";
export function EditCategory(){

    const itens = [
        {
          title: "Categoria",
          component: <CategoryEditForm />,
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