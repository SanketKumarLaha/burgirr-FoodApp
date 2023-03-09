import React, { useState } from "react";
import styles from "./Home.module.css";
import RestaurantList from "../../components/RestaurantList/RestaurantList";

const Body = () => {
  const [searchedData, setSearchedData] = useState("");
  return (
    <div className={styles.body}>
      <div className={styles.searchSection}>
        <div className={styles.searchDiv}>
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchedData}
            onChange={(e) => setSearchedData(e.target.value)}
          />
        </div>
      </div>
      <RestaurantList searchedData={searchedData} />
    </div>
  );
};

export default Body;
