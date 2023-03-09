import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Cart.module.css";
import { CimgID } from "../../assets/cloudinaryImgId";
import CartEmptyPage from "../../components/CartEmptyPage/CartEmptyPage";
import {
  increaseItem,
  decreaseItem,
  totalCost,
} from "../../assets/reduxStore/CartSlice";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const Cart = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const cart = useSelector((store) => store.cart);
  const restaurant = useSelector((store) => store.restaurant.items);

  const dispatch = useDispatch();
  const add = (item) => {
    dispatch(increaseItem(item));
  };
  const remove = (item) => {
    dispatch(decreaseItem(item));
  };

  useEffect(() => {
    dispatch(totalCost());
  }, [cart]);

  const confirmed = () => {
    setIsConfirmed(true);
  };

  return !cart.items.length ? (
    <CartEmptyPage />
  ) : (
    <>
      <div className={style.cartContainerCover}>
        <div className={style.cartContainer}>
          <div className={style.cartHeader}>
            <div className={style.cartImageDiv}>
              <img src={CimgID + restaurant[0].cloudinaryImageId} alt="" />
            </div>
            <div className={style.cartItemDetailsDiv}>
              <h3>{restaurant[0].name}</h3>
              <h4>{restaurant[0].area}</h4>
            </div>
          </div>
          <div className={style.cartBody}>
            {cart.items.map((item) => (
              <div className={style.cartItemContainer} key={item.id}>
                <div className={style.cartLeftSide}>
                  <div className={style.cartIconDiv}>
                    <img
                      src={
                        item.isVeg
                          ? "https://img.icons8.com/color/2x/vegetarian-food-symbol.png"
                          : "https://img.icons8.com/color/1x/non-vegetarian-food-symbol.png "
                      }
                      alt=""
                    />
                  </div>
                  <h4>{item.name}</h4>
                </div>
                <div className={style.cartRightSide}>
                  <div className={style.cartItemsNumberDiv}>
                    <div className={style.cartButton}>
                      <div
                        className={style.cartRemove}
                        onClick={() => remove(item)}
                      >
                        -
                      </div>
                      <div className={style.cartText}>{item.cartQuantity}</div>
                      <div className={style.cartAdd} onClick={() => add(item)}>
                        +
                      </div>
                    </div>
                  </div>
                  <div className={style.cartPrice}>
                    ₹{(item.price / 100) * item.cartQuantity}
                  </div>
                </div>
              </div>
            ))}
            <div className={style.cartBillDetails}>
              <div className={style.cartItemTotal}>
                <h5>Item Total</h5>
                <h5>Rs {cart.totalAmount}</h5>
              </div>
              <div className={style.cartDelFee}>
                <h5>Delivery Partner Fee</h5>
                <h5>Rs 29</h5>
              </div>
            </div>
          </div>
          <div className={style.cartFooter}>
            <div className={style.cartToPay}>
              <h3>TO PAY</h3>
            </div>
            <div className={style.cartAmount} onClick={confirmed}>
              Rs {cart.totalAmount + 29}
            </div>
          </div>
        </div>
      </div>
      {isConfirmed && <ConfirmationModal />}
    </>
  );
};

export default Cart;
