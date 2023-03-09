import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { CimgID } from "../../assets/cloudinaryImgId";

const Card = ({
  cloudinaryImageId,
  name,
  avgRating,
  deliveryTime,
  costForTwoString,
  sla,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainerHeader}>
        <img src={CimgID + cloudinaryImageId} alt="" />
      </div>
      <div className={styles.cardContainerFooter}>
        <div className={styles.title}>
          <h2>
            <Link
              to={`/restaurant/${sla.restaurantId}`}
              className={styles.cardLinkStyle}
            >
              {name}
            </Link>
          </h2>
        </div>
        <div className={styles.details}>
          <div className={styles.rating}>
            <img
              id="star"
              src="https://cdn-icons-png.flaticon.com/512/1550/1550596.png"
              alt=""
            />
            <h4>{avgRating}</h4>
          </div>
          <div className={styles.time}>
            <h4>{deliveryTime} mins</h4>
          </div>
          <div className={styles.price}>
            <h4>{costForTwoString}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
