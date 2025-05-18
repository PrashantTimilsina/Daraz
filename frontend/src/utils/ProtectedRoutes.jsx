import { Outlet, Navigate } from "react-router-dom";
import { useData } from "../context/Context";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoutes = () => {
  const { isLoggedIn, setIsLoggedIn } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("https://daraz-backend-lsuk.onrender.com/user/checkauth", {
          withCredentials: true,
        });
        if (res.data.cookies) setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false); // Ensure we stop loading after the check
      }
    }
    checkAuth();
  }, [setIsLoggedIn]);

  if (loading) return null; // Don't redirect until check is done

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
