import { useForm } from "react-hook-form";

import axios from "axios";
import { useData } from "../context/Context";
import { toast } from "react-toastify";
import { useLocal } from "../context/LocalContext";
function Signup() {
  const { setUserData, setIsLoggedIn } = useData();
  const { setButtonText, buttonText } = useLocal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setButtonText(true);
      const res = await axios.post("https://daraz-backend-lsuk.onrender.com/user/signup", data, {
        withCredentials: true,
      });
      const detail = res.data;
      console.log("API Response:", detail);
      setUserData(detail);

      if (res.status === 200) {
        setIsLoggedIn(true);
        toast.success("Signup successful", { autoClose: 1500 });

        localStorage.setItem("name", JSON.stringify(detail?.user?.name || ""));
        document.getElementById("my_modal_4").close();
        reset();
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error);

      if (error.response) {
        const errorData = error.response.data;
        if (errorData.error) {
          toast.error(errorData.error[0]);
        } else {
          toast.error(errorData.message || "Something went wrong!");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setButtonText(false);
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-screen-2xl text-black bg-white">
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box">
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("my_modal_4").close();
                }}
              >
                ✕
              </button>
              <h3 className="ml-3 text-lg font-bold">Sign Up</h3>
              <div className="mt-3 flex flex-col gap-6 p-3">
                <div className="space-y-3">
                  <h2>Name</h2>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-[80%] p-1 outline-none"
                    {...register("name", { required: true })}
                  />
                  <br />
                  {errors.name && (
                    <span className="p-1 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
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
                <div className="space-y-3">
                  <h2>Confirm Password</h2>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-[80%] p-1 outline-none"
                    {...register("passwordConfirm", { required: true })}
                  />
                  <br />
                  {errors.passwordConfirm && (
                    <span className="p-1 text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <button className="w-1/2 rounded-md bg-[#F85506] px-3 py-2 text-white">
                  {buttonText ? "⌛" : "Sign Up"}
                </button>
              </div>
            </form>
            <p className="flex gap-3 p-3">
              Already have an account?{" "}
              <a href="/" className="cursor-pointer text-blue-600">
                Login
              </a>
            </p>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Signup;
