import styles from "./styles.module.css";
import { FaCashRegister, FaHome, FaAddressCard } from "react-icons/fa";
import { IoEyeSharp, IoLogOut } from "react-icons/io5";
import icon from "../../assets/icon.jpg";
import { Link } from "react-router-dom";

export function SidebarResult() {

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    
  
};

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={icon} alt="" width="100px" height="100px" />
      </div>
      <ul className={styles.ul}>
        <Link to="/home" className={styles.containerIcon}>
          <div className={styles.listContainer}>
            <FaHome className={styles.icon}/>
            <li className={styles.li}>Inicio</li>
          </div>
        </Link>

        <Link to="/register" className={styles.containerIcon}>
          <div className={styles.listContainer}>
            <FaCashRegister className={styles.icon}/>
            <li className={styles.li}>Cadastro</li>
          </div>
        </Link>

        <Link to="/visualizer" className={styles.containerIcon}>
          <div className={styles.listContainer}>
            <IoEyeSharp className={styles.icon}/>
            <li className={styles.li}>Visualizar</li>
          </div>
        </Link>

        <Link to="/result" className={styles.containerIcon}>
          <div className={styles.listContainer}>
            <FaAddressCard className={styles.icon} />
            <li className={styles.li}>Resultado</li>
          </div>
        </Link>

        <Link to="/" className={styles.containerIcon} onClick={handleLogout}>
          <div className={styles.listContainer}>
            <IoLogOut className={styles.icon} />
            <li className={styles.li}>Sair</li>
          </div>
        </Link>
      </ul>
    </nav>
  );
}

export default SidebarResult;
