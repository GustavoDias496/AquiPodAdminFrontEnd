import { useEffect, useState } from "react";

import styles from "../../global/styles/pages.module.css";
import api from "../../services/api";
import { Chart } from "react-google-charts";
import SidebarResult from "../../components/sidebarResult/sidebarResult";

export function Result() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api
      .get("/voteresult")
      .then((response) => {
        const formattedData = response.data.resultData.map(
          (categoryData: { category: any; data: any }) => ({
            category: categoryData.category,
            data: [
              [categoryData.category, "Votos"],
              ...categoryData.data.slice(1),
            ],
          })
        );

        setData(formattedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderGraph = () => {
    return (
      <>
        {data.map((categoryData, index) => (
          <div key={index}>
            <h3 className={styles.graphTitle}>{categoryData.category}</h3>
            <Chart
              chartType="Bar"
              width="300px"
              height="400px"
              data={categoryData.data}
              options={{
                title: categoryData.category,
                titleTextStyle: { color: 'white'},
              }}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <section className={styles.section}>
      <SidebarResult />
      <div className={styles.containerResult}>{renderGraph()}</div>
    </section>
  );
}
