import { Sidebar } from "../../components/sidebar/sidebar";
import styles from "../../global/styles/pages.module.css";
import icon from "../../assets/icon.jpg";
export function Home() {
  return (
    <section className={styles.section}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.homeContainer}>
        <text className={styles.title}>AQUIPOD ADMIN</text>
          <img
            className={styles.icon}
            src={icon}
            alt=""
            width="300px"
            height="300px"
          />
          
        </div>
      </div>
    </section>
  );
}
