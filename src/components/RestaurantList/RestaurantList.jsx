import React, { useEffect, useState } from "react";
import ShimmerRestaurantList from "../ShimmerRestaurantList/ShimmerRestaurantList";
import Card from "../Card/Card";
import styles from "./RestaurantList.module.css";
import { useLocation } from "../../assets/context/LocationProvider";

const RestaurantList = ({ searchedData }) => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (location.latitude && location.longitude) callApiForRestaurants();
  }, [location]);
  async function callApiForRestaurants() {
    try {
      const response = await fetch(
        `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.latitude}&lng=${location.longitude}&page_type=DESKTOP_WEB_LISTING`
      );
      const jsonData = await response.json();
      setData(jsonData?.data?.cards[2]?.data?.data?.cards);
      setFilterData(jsonData?.data?.cards[2]?.data?.data?.cards);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(location);
  useEffect(() => {
    if (searchedData === "") setFilterData(data);
    else
      setFilterData(
        data?.filter((item) =>
          item.data.name.toLowerCase().includes(searchedData.toLowerCase())
        )
      );
  }, [searchedData]);
  return !data ? (
    <ShimmerRestaurantList />
  ) : (
    <div className={styles.allCards}>
      {filterData.map((item, index) => (
        <Card key={item.data.id} {...item.data} />
      ))}
    </div>
  );
};

export default RestaurantList;
