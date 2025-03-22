import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const userContext = createContext();
function UserProvider({ children }) {
  const [saleData, setSaleData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [id, setId] = useState(null);
  const [addedMovies, setAddedMovies] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [text, setText] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function saleData() {
      try {
        const res = await axios.get("http://localhost:8000/sale");

        setSaleData(res?.data?.data?.saleProducts);
      } catch (error) {
        console.log(error);
      }
    }
    saleData();
  }, []);
  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get("http://localhost:8000/product");
        setProductData(res?.data?.data?.product);
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
        quantity,
        setQuantity,
        clicked,
        setClicked,
        filterData,
        setFilterData,
        text,
        setText,
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
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
