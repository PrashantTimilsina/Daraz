import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const userContext = createContext();
function UserProvider({ children }) {
  const [saleData, setSaleData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [id, setId] = useState(null);
  const [addedMovies, setAddedMovies] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    async function saleData() {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8000/sale");

        setSaleData(res?.data?.data?.saleProducts);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    saleData();
  }, []);
  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8000/product");
        setProductData(res?.data?.data?.product);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, []);

  return (
    <userContext.Provider
      value={{
        saleData,
        productData,
        id,
        setId,
        addedMovies,
        setAddedMovies,
        filterData,
        setFilterData,
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        profileData,
        setProfileData,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
function useData() {
  const context = useContext(userContext);
  return context;
}
export { UserProvider, useData };
