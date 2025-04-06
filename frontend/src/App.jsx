import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Description from "./components/Description";
import Layout from "./Layout";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import CategoryCard from "./components/CategoryCard";
import { useData } from "./context/Context";
import SearchCard from "./components/SearchCard";
import Profile from "./components/Profile";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ResetPassword from "./components/ResetPassword";
function App() {
  const { filterData } = useData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/reset/:token" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<Description />} />
          <Route
            path="/category"
            element={<CategoryCard filterData={filterData} />}
          />
          <Route path="/search" element={<SearchCard />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
