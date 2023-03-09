import { createContext, useContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const useLoc = () => {
  return useContext(LocationContext);
};

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    callApiForLocation();
  }, []);

  async function callApiForLocation() {
    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    const error = (errorObj) => {
      alert(errorObj.code + ": " + errorObj.message);
    };
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 10000,
    });
  }
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
