import React from "react";
import styles from "./ConfirmationModal.module.css";
import tick from "../../images/tick.svg";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { resetRestaurant } from "../../assets/reduxStore/RestaurantSlice";
import { resetCart } from "../../assets/reduxStore/CartSlice";

const ConfirmationModal = () => {
  const dispatch = useDispatch();
  const clearCarts = () => {
    dispatch(resetRestaurant());
    dispatch(resetCart());
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.confirmationContainerCover}>
        <div className={styles.confirmationContainer}>
          <img src={tick} alt="" />
          <h1>Order Confirmed</h1>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className={styles.nearYou} onClick={clearCarts}>
              Continue shopping
            </div>
          </Link>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ConfirmationModal;
