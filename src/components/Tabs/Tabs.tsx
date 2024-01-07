import { useEffect, useState } from 'react';
import styles from './styles.module.css';


type item = {
  title: string
  activeTab: number;
  index: number;
  icon: JSX.Element;
}

function ItemTabs({ title, activeTab, index, icon }: item) {
  const handleClick = () => {
    if ((activeTab != index)) {
      const currentURL = new URL(window.location.href);
      currentURL.searchParams.set('tab', title);
      const newURL = currentURL.toString();

      window.history.pushState({ path: newURL }, '', newURL);
    }
  }

  return (
    <div
      key={index}
      className={activeTab === index ? styles.itemTabsDisabled : styles.itemTabs}
      onClick={handleClick}
    >
      <p>{icon} {title}</p>
    </div>
  ); 
}


type tabItem = {
  title: string;
  component: JSX.Element;
  icon: JSX.Element;
  height?: string;
}

type tabsItens = {
  itens: tabItem[];
}

export default function Tabs({ itens }: tabsItens) {
  const [activeTab, setActiveTab] = useState(0);

  const openTabClick = (index: number) => {
    const currentURL = new URL(window.location.href);
    const tabParam = currentURL.searchParams.get('tab');

    if (tabParam) {
      const indexLink = itens.findIndex(objeto => objeto.title === tabParam);
      setActiveTab(indexLink);
    } else{
      setActiveTab(index);
      currentURL.searchParams.set('tab', itens[0].title);
      const newURL = currentURL.toString();
      window.history.pushState({ path: newURL }, '', newURL);
    } 
  };

  useEffect(() => {
      openTabClick(0);
    }
  ),[];

  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
      {itens.map(({ title, icon }, index) => (
        <div className={styles.buttontabs} onClick={() => openTabClick(index)}>
          <ItemTabs
            icon={icon}
            title={title}
            activeTab={activeTab}
            index={index}
          />
        </div>
      ))}

      </div>
      <div key={activeTab} className={styles.conteiner} style={{ height: itens[activeTab].height, overflowY: itens[activeTab].title === "Apoiadores" ? "auto" : "hidden" }}>
        {itens[activeTab].component}
      </div>
    </div>
  );
}