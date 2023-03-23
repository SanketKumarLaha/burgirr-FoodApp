import { createContext, useContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const useLocation = () => {
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
  const callApiForLocation = async () => {
    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      console.log("success");
    };
    const error = (error) => {
      console.log(error);
    };
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by the device");
    } else {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    }
  };
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
