import React from "react";
import styles from "./ShimmerRestaurantList.module.css";

const Shimmer = () => {
  return (
    <div className={styles.shimmerContainer}>
      {Array(10)
        .fill(" ")
        .map((item, index) => (
          <div className={styles.shimmerCard} key={index}></div>
        ))}
    </div>
  );
};

export default Shimmer;
