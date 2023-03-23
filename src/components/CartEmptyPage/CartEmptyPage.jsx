import React from "react";
import { Link } from "react-router-dom";
import styles from "./CartEmptyPage.module.css";

const CartEmptyPage = () => {
  return (
    <div className={styles.containerCover}>
      <div className={styles.container}>
        <div className={styles.imageDiv}>
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt=""
          />
        </div>
        <h2>Your cart is empty</h2>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.nearYou}>SEE RESTAURANTS NEAR YOU</div>
        </Link>
      </div>
    </div>
  );
};

export default CartEmptyPage;
