import { FaUserPlus } from "react-icons/fa";
import Tabs from "../../components/Tabs/Tabs";
import { Sidebar } from "../../components/sidebar/sidebar";
import styles from '../../global/styles/pages.module.css';
import { UserTable } from "../../components/Tables/UserTable/UserTable";
import { BiCategory } from "react-icons/bi";
import { CategoryTable } from "../../components/Tables/CategoryTable/CategoryTable";
import { EpisodeTable } from "../../components/Tables/EpisodeTable/EpisodeTable";
import { FaDisplay, FaPerson } from "react-icons/fa6";
import { FinalistTable } from "../../components/Tables/FinalistTable/FinalistTable";
import { ServiceTable } from "../../components/Tables/ServiceTable/ServiceTable";
import { MdMiscellaneousServices } from "react-icons/md";

const itens = [
    {
      title: "Usuários",
      component: <UserTable />,
      icon: <FaUserPlus />,
    },
    {
      title: "Categorias",
      component: <CategoryTable/>,
      icon: <BiCategory />,
    },
    {
      title: "Episódios",
      component: <EpisodeTable />,
      icon: <FaDisplay />,
    },
    {
      title: "Finalistas",
      component: <FinalistTable />,
      icon: <FaPerson />,
    },
    {
      title: "Serviços",
      component: <ServiceTable />,
      icon: <MdMiscellaneousServices />,
    },
  ];

export function Visuazer(){
    return(
        <section className={styles.section}>
        <Sidebar />
        <div className={styles.container}>
          <Tabs itens={itens}/>
        </div>
      </section>
    )
}