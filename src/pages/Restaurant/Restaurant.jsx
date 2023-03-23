import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CimgID } from "../../assets/cloudinaryImgId";
import style from "./Restaurant.module.css";
import MenuCard from "../../components/MenuCard/MenuCard";
import ShimmerRestaurant from "../../components/ShimmerRestaurant/ShimmerRestaurant";
import { useLocation } from "../../assets/context/LocationProvider";

export const MENU_ITEM_TYPE_KEY =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
export const RESTAURANT_TYPE_KEY =
  "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";

const Restaurant = () => {
  const [menu, setMenu] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [searchedItem, setSearchedItem] = useState("");
  const [filterMenuItems, setFilterMenuItems] = useState({});
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.latitude && location.longitude) callMenuApi();
  }, [location]);

  async function callMenuApi() {
    try {
      const response = await fetch(
        `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${location.latitude}&lng=${location.longitude}&&submitAction=ENTER&restaurantId=${id}`
      );
      const json = await response.json();

      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      setRestaurant(restaurantData);

      const menuItemsData =
        json?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setMenu(uniqueMenuItems);
      setFilterMenuItems(uniqueMenuItems);
    } catch (error) {
      // setMenu([]);
      // setFilterMenuItems([]);
      // setRestaurant(null);
      // console.log(error);
    }
  }
  useEffect(() => {
    if (searchedItem === "") setFilterMenuItems(menu);
    else
      setFilterMenuItems(
        menu?.filter((item) =>
          item.name.toLowerCase().includes(searchedItem.toLowerCase())
        )
      );
  }, [searchedItem]);
  return !restaurant ? (
    <ShimmerRestaurant />
  ) : (
    <div className={style.restaurantContainer}>
      <div className={style.restaurantHeaderContainerColor}>
        <div
          className={style.restaurantHeaderContainer}
          style={{ backgroundColor: "black" }}
        >
          <div className={style.restaurantHeader}>
            <div className={style.imageDiv}>
              <img src={CimgID + restaurant.cloudinaryImageId}></img>
            </div>
            <div className={style.restaurantDetailsDiv}>
              <h1>{restaurant.name}</h1>
              <h3>{restaurant.cuisines.toString()}</h3>
              <h3>{restaurant.locality}</h3>
              <div className={style.subDetails}>
                <div>
                  <img
                    id="stars"
                    src="https://cdn-icons-png.flaticon.com/512/1550/1550596.png"
                    alt=""
                  />
                  <h4>{restaurant.avgRating}</h4>
                </div>
                <div>
                  <div className={style.time}>
                    <h4>{restaurant.sla.slaString}</h4>
                  </div>
                </div>
                <div>
                  <div className={style.price}>
                    <h4>{restaurant.costForTwoMessage}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.restaurantSearchBar}>
        <input
          type="text"
          placeholder="Search for dishes..."
          value={searchedItem}
          onChange={(e) => setSearchedItem(e.target.value)}
        />
      </div>
      {filterMenuItems.map((item) => (
        <MenuCard key={item.id} item={item} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default Restaurant;
