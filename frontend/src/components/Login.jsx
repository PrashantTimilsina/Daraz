import { useForm } from "react-hook-form";
import Signup from "./Signup";
import axios from "axios";
import { useData } from "../context/Context";
import { useEffect } from "react";
import { toast } from "react-toastify";
function Login() {
  axios.defaults.withCredentials = true;
  const { setUserData, setIsLoggedIn } = useData();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/user/login", data, {
        withCredentials: true,
      });

      const detail = res.data;
      setUserData(detail);

      if (res.status === 200) {
        localStorage.setItem("name", JSON.stringify(detail?.name || ""));
        if (detail?.token) setIsLoggedIn(true);
        document.getElementById("my_modal_3").close();

        toast.success("Login successful", { autoClose: 1500 });
        reset();
      }
    } catch (error) {
      console.error("Login Error:", error);

      // Extract and display error message
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage, { autoClose: 1500 });
      setIsLoggedIn(false);
    }

    if (errors.email || errors.password) {
      return;
    }
  };

  useEffect(() => {
    async function checkAuth() {
      const res = await axios.get("http://localhost:8000/user/checkauth", {
        withCredentials: true,
      });
      const data = await res.data;
      if (data.cookies) setIsLoggedIn(true);
    }
    checkAuth();
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-screen-2xl text-black">
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>
              <h3 className="ml-3 text-lg font-bold">Login</h3>
              <div className="mt-3 flex flex-col gap-6 p-3">
                <div className="space-y-3">
                  <h2>Email</h2>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-[80%] p-1 outline-none"
                    {...register("email", { required: true })}
                  />
                  <br />
                  {errors.email && (
                    <span className="p-1 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="space-y-3">
                  <h2>Password</h2>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-[80%] p-1 outline-none"
                    {...register("password", { required: true })}
                  />
                  <br />
                  {errors.password && (
                    <span className="p-1 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <button className="w-1/2 rounded-md bg-[#F85506] px-3 py-2 text-white">
                  Login
                </button>
              </div>
            </form>
            <p className="flex gap-3 p-3">
              Don't have an account?{" "}
              <span
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="cursor-pointer text-blue-600"
              >
                Sign up
              </span>
            </p>
          </div>
        </dialog>
      </div>
      <Signup />
    </>
  );
}

export default Login;
