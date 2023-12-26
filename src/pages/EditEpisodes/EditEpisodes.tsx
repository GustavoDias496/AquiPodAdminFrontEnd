import { BiCategory } from "react-icons/bi";
import { Sidebar } from "../../components/sidebar/sidebar";
import styles from '../../global/styles/pages.module.css';
import Tabs from "../../components/Tabs/Tabs";
import { EpisodeEditForm } from "../../components/EditForms/EpisodeEditForm/EpisodeEditForm";
export function EditEpisodes(){

    const itens = [
        {
          title: "Episódio",
          component: <EpisodeEditForm />,
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