import React, { useEffect, useState } from "react";
import ShimmerRestaurantList from "../ShimmerRestaurantList/ShimmerRestaurantList";
import Card from "../Card/Card";
import styles from "./RestaurantList.module.css";
import { useLocation } from "../../assets/hooks/useLocation";
import { useLoc } from "../../assets/context/LocationProvider";

const RestaurantList = ({ searchedData }) => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const location = useLoc();
  // const location = useLocation();

  useEffect(() => {
    callApiForRestaurants();
  }, [location]);
  async function callApiForRestaurants() {
    try {
      const response = await fetch(
        `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.latitude}&lng=${location.longitude}&page_type=DESKTOP_WEB_LISTING`
      );
      const jsonData = await response.json();
      setData(jsonData?.data?.cards[2]?.data?.data?.cards);
      setFilterData(jsonData?.data?.cards[2]?.data?.data?.cards);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (searchedData === "") setFilterData(data);
    else
      setFilterData(
        data?.filter((item) =>
          item.data.name.toLowerCase().includes(searchedData.toLowerCase())
        )
      );
  }, [searchedData]);

  console.log(data);
  return !data ? (
    <ShimmerRestaurantList />
  ) : (
    <div className={styles.allCards}>
      {filterData.map((item, index) => (
        <Card key={index} {...item.data} item={item} location={location} />
      ))}
    </div>
  );
};

export default RestaurantList;
