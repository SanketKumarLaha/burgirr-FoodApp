import { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    callApiForLocation();
  }, []);

  async function callApiForLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }
  return location;
};
