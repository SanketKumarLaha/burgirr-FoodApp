import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../../assets/reduxStore/CartSlice";
import { resetRestaurant } from "../../assets/reduxStore/RestaurantSlice";
import styles from "./Modal.module.css";

const Modal = ({ isModalOn, onBack }) => {
  const dispatch = useDispatch();
  const reset = () => {
    dispatch(resetCart());
    dispatch(resetRestaurant());
    onBack();
  };

  if (!isModalOn) return;
  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <div>
          <h2>Items already in cart brother</h2>
          <h3>
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </h3>
        </div>
        <div className={styles.buttonDiv}>
          <button onClick={onBack}>
            <h2>No</h2>
          </button>
          <button onClick={reset}>
            <h2>Yes start afresh</h2>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
