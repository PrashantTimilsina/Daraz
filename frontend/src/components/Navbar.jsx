import { IoSearch } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { LuLogIn } from "react-icons/lu";
import { SiGnuprivacyguard } from "react-icons/si";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocal } from "../context/LocalContext";
function Navbar() {
  const [show, setShow] = useState(false);
  const { profileData, setProfileData } = useData();
  console.log(profileData);

  const { isLoggedIn, setIsLoggedIn } = useData();
  const { buttonText, setButtonText, text, setText } = useLocal();
  const navigate = useNavigate();
  // const token = JSON.parse(localStorage.getItem("token"));
  // const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  const getName = JSON.parse(localStorage.getItem("name"));
  function handleNav() {
    setShow((show) => !show);
  }
  function handleSearch() {
    navigate("/search");
  }
  async function logout() {
    setButtonText(true);
    const res = await axios.post(
      "https://daraz-backend-lsuk.onrender.com/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    // const data = await res.data;
    setTimeout(() => {
      setIsLoggedIn(false);
      setButtonText(false);
      navigate("/");

      handleNav();
    }, 1500);
  }
  function handleCart() {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      toast.error("Please login to access the cart section", {
        autoClose: 1500,
      });
      navigate("/");
    }
    handleNav();
  }
  function handleKeyPress(e) {
    if (e.code === "Enter") {
      handleSearch();
    }
  }
  useEffect(() => {
    async function fetchProfile() {
      const res = await axios.get("https://daraz-backend-lsuk.onrender.com/user/profile", {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data);
      setProfileData(data);
    }
    fetchProfile();
  }, []);

  return (
    <>
      <div className="container fixed top-0 z-50 mx-auto flex h-24 max-w-screen-2xl items-center justify-between bg-[#F85506] p-2 px-5 text-white">
        {/*IMAGE SECTION*/}

        <div className="sm:ml-7">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaRGl23rCWQF7k4ecZDfbBkOsvDd8wseRi1w&s"
            alt="daraz logo"
            className="h-20 w-32 object-cover"
          />
        </div>

        {/*SEARCH BAR*/}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search in Daraz"
            className="my-auto rounded-sm border-none p-1 text-black outline-none md:h-10 md:w-72 md:p-2 lg:w-96"
            spellCheck="false"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <IoSearch
           className="z-50 h-8 w-auto cursor-pointer bg-[#FFE1D2] p-2 text-xs text-[#FCB08B] md:h-10"
            onClick={handleSearch}
          />
        </div>

        {/*ICONS*/}

        <div
          className={`flex flex-col sm:flex-row items-center justify-center top-24  sm:top-0  fixed cursor-pointer px-4 z-20 w-full gap-8 sm:relative sm:flex sm:w-auto transition-all ease-in-out duration-300 mr-8 sm:mr-0 ${
            show
              ? "opacity-100 translate-x-0 pointer-events-auto bg-[#F85506] py-4"
              : "opacity-0 translate-x-full sm:opacity-100 sm:translate-x-0 sm:pointer-events-auto"
          }`}
        >
          <div className="flex items-center gap-2 hover:border-b-2 hover:pb-1">
            <h1
              onClick={() => {
                navigate("/");
                handleNav();
                setText("");
              }}
            >
              HOME
            </h1>
          </div>
          <div
            className="flex items-center gap-2 hover:border-b-2 hover:pb-1"
            onClick={handleCart}
          >
            <CiShoppingCart className="text-3xl font-bold" />
            <h1>CART</h1>
          </div>
          {/*LOGIN*/}

          <div className="flex items-center justify-center gap-2 hover:border-b-2 hover:pb-1">
            {isLoggedIn ? (
              <div className="flex w-28 items-center justify-center rounded-xl bg-orange-400 px-2 py-1">
                <LuLogIn />
                <h2 onClick={logout}>{buttonText ? "⌛" : "Logout"}</h2>
              </div>
            ) : (
              <>
                <LuLogIn />
                <h2
                  onClick={() => {
                    document.getElementById("my_modal_3").showModal();
                    handleNav();
                  }}
                >
                  LOGIN
                </h2>
              </>
            )}
            {/* <Login /> */}
          </div>

          {/*signup*/}
          <div className="flex items-center gap-2 hover:border-b-2 hover:pb-1">
            {isLoggedIn ? (
              <>
                <div
                  className="flex items-center justify-center gap-2"
                  onClick={() => {
                    navigate("/profile");
                    handleNav();
                  }}
                >
                  <img
                    src={
                      profileData?.user?.image
                        ? `https://daraz-backend-lsuk.onrender.com/images/${profileData?.user?.image}`
                        : "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
                    }
                    alt="profile pic"
                    className="h-6 w-6 rounded-full object-cover"
                  />

                  <p>{getName}</p>
                </div>
              </>
            ) : (
              <>
                <SiGnuprivacyguard />
                <h2
                  onClick={() => {
                    document.getElementById("my_modal_4").showModal();
                    handleNav();
                  }}
                >
                  SIGN UP
                </h2>
              </>
            )}
            {/* <Signup /> */}
          </div>
        </div>
        <div className="block text-2xl sm:hidden">
          {show ? (
            <IoIosClose onClick={handleNav} className="mx-2 text-3xl" />
          ) : (
            <RxHamburgerMenu onClick={handleNav} className="mx-2" />
          )}
        </div>
      </div>
      <Login />
      <Signup />
    </>
  );
}

export default Navbar;
