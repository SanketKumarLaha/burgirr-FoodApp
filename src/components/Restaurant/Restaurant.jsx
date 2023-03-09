import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CimgID } from "../../assets/cloudinaryImgId";
import { useLocation } from "../../assets/hooks/useLocation";
import style from "./Restaurant.module.css";
import MenuCard from "../MenuCard/MenuCard";
import ShimmerRestaurant from "../ShimmerRestaurant/ShimmerRestaurant";
import { useLoc } from "../../assets/context/LocationProvider";

const Restaurant = () => {
  const [menu, setMenu] = useState(null);
  const [searchedItem, setSearchedItem] = useState("");
  const [menuItems, setMenuItems] = useState({});
  const [filterMenuItems, setFilterMenuItems] = useState({});
  const { id } = useParams();
  const location = useLoc();
  // const location = useLocation();

  useEffect(() => {
    callMenuApi();
  }, [location]);

  const callMenuApi = async () => {
    const response = await fetch(
      `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/v4/full?lat=${location.latitude}&lng=${location.longitude}&menuId=${id}`
    );
    const json = await response.json();
    setMenu(json?.data);
    setMenuItems(json?.data?.menu?.items);
    setFilterMenuItems(json?.data?.menu?.items);
  };
  useEffect(() => {
    if (searchedItem === "") setFilterMenuItems(menuItems);
    else
      setFilterMenuItems(
        Object.values(menuItems)?.filter((item) =>
          item.name.toLowerCase().includes(searchedItem.toLowerCase())
        )
      );
  }, [searchedItem]);

  return !menu ? (
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
              <img src={CimgID + menu.cloudinaryImageId}></img>
            </div>
            <div className={style.restaurantDetailsDiv}>
              <h1>{menu.name}</h1>
              <h3>{menu.cuisines.toString()}</h3>
              <h3>{menu.area}</h3>
              <div className={style.subDetails}>
                <div>
                  <img
                    id="stars"
                    src="https://cdn-icons-png.flaticon.com/512/1550/1550596.png"
                    alt=""
                  />
                  <h4>{menu.avgRating}</h4>
                </div>
                <div>
                  <div className={style.time}>
                    <h4>{menu.sla.slaString}</h4>
                  </div>
                </div>
                <div>
                  <div className={style.price}>
                    <h4>{menu.costForTwoMsg}</h4>
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
      {Object.values(filterMenuItems).map((item) => (
        <MenuCard key={item.id} item={item} restaurant={menu} />
      ))}
    </div>
  );
};

export default Restaurant;
// lat=21.1702401&lng=72.83106070000001
