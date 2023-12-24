import styles from '../../global/styles/pages.module.css';
import { UserForm } from "../../components/RegisterForms/UserForm/UserForm";
import { Sidebar } from "../../components/sidebar/sidebar";
import { BiCategory } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import Tabs from '../../components/Tabs/Tabs';
import { CategoryForm } from '../../components/RegisterForms/CategoryForm/CategoryForm';
import { EpisodesForm } from '../../components/RegisterForms/EpisodesForm/EpisodesForm';
import { FaDisplay } from "react-icons/fa6";
import { ServiceForm } from '../../components/RegisterForms/ServiceForm/ServiceForm';
import { FinalistForm } from '../../components/RegisterForms/FinalistForm/FinalistForm';
import { MdMiscellaneousServices } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";

const itens = [
  {
    title: "Usuários",
    component: <UserForm />,
    icon: <FaUserPlus />,
  },
  {
    title: "Categorias",
    component: <CategoryForm />,
    icon: <BiCategory />,
  },
  {
    title: "Episódios",
    component: <EpisodesForm />,
    icon: <FaDisplay />,
  },
  {
    title: "Serviços",
    component: <ServiceForm />,
    icon: <MdMiscellaneousServices />,
  },
  {
    title: "Finalistas",
    component: <FinalistForm />,
    icon: <FaPerson />,
  },
];

export function Register() {
  return (
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.container}>
          <Tabs itens={itens}/>
        </div>
      </section>
  );
}
