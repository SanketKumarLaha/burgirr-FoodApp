import React from "react";
import styles from "./ShimmerRestaurant.module.css";

const ShimmerRestaurant = () => {
  return (
    <div className={styles.shimmerContainer}>
      <div className={styles.shimmerHeaderContainerColor}>
        <div className={styles.shimmerHeaderContainer}>
          <div className={styles.shimmerHeader}>
            <div className={styles.shimmerInnerDiv}></div>
          </div>
        </div>
      </div>
      {Array(10)
        .fill("")
        .map((item, index) => (
          <div key={index} className={styles.shimmerMenuContainer}>
            <div className={styles.shimmerMenuItems}></div>
          </div>
        ))}
    </div>
  );
};

export default ShimmerRestaurant;
