import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../assets/reduxStore/CartSlice";
import { addRestaurant } from "../../assets/reduxStore/RestaurantSlice";
import style from "./MenuCard.module.css";
import { CimgID } from "../../assets/cloudinaryImgId";
import Modal from "../Modal/Modal";

const MenuCard = ({ item, restaurant }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  const selectedRestaurant = useSelector((store) => store.restaurant.items);

  const dispatch = useDispatch();

  const add = (item, restaurant) => {
    if (!selectedRestaurant.length) {
      dispatch(addItemToCart(item));
      dispatch(addRestaurant(restaurant));
    } else {
      selectedRestaurant[0].id !== restaurant.id
        ? modalOn()
        : dispatch(addItemToCart(item));
    }
  };

  const modalOn = () => {
    setIsModalOn((prev) => !prev);
  };
  const foodItems = useSelector((store) => store.cart.items);
  const isAdded = () => {
    const itemIndex = foodItems.findIndex((y) => y.id === item.id);
    let addedOrNot = itemIndex >= 0 ? "Added" : "Add";
    return addedOrNot;
  };
  return (
    <>
      <div className={style.restaurantFooterContainerColor}>
        <div className={style.restaurantFooterContainer}>
          <div className={style.restaurantFooter}>
            <div className={style.itemDiv}>
              <div className={style.foodType}></div>
              <div className={style.foodName}>
                <h3>{item.name}</h3>
                <div
                  className={style.circle}
                  style={{
                    backgroundColor: item.isVeg === 0 ? "red" : " green",
                  }}
                ></div>
              </div>
              <div className={style.foodPrice}>
                <h3>₹{item.price / 100}</h3>
              </div>
            </div>
            <div className={style.itemImageDiv}>
              <img src={CimgID + item.cloudinaryImageId} alt="" />
              <div
                className={style.button}
                onClick={() => {
                  add(item, restaurant);
                }}
              >
                <div className={style.text}>{isAdded()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isModalOn={isModalOn} onBack={modalOn} />
    </>
  );
};

export default MenuCard;
