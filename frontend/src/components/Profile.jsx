import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../context/Context";
import ResetPassword from "./ResetPassword";

function Profile() {
  const [profileData, setProfileData] = useState([]);
  const [modal, setModal] = useState(false);
  const [resetPass, setResetPass] = useState(false);

  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn } = useData();
  console.log(isLoggedIn);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  useEffect(() => {
    async function fetchProfile() {
      const res = await axios.get("http://localhost:8000/user/profile", {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data);
      setProfileData(data);
    }
    fetchProfile();
  }, []);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/changePassword",
        data,
        { withCredentials: true }
      );
      const detail = res.data;
      if (res.status === 200) {
        toast.success(detail?.message, { autoClose: 1500 });

        // navigate("/");
      }
      console.log(detail);

      setModal((modal) => !modal);
      reset();
      setIsLoggedIn(false);

      navigate("/");
    } catch (error) {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg, { autoClose: 1500 });
    }
  };
  function resetPassword(e) {
    e.preventDefault();
    setResetPass((reset) => !reset);
  }
  const onForget = async (data) => {
    try {
      // setResetPass((reset) => !reset);
      const res = await axios.post(
        "http://localhost:8000/user/forgotPassword",
        data,
        { withCredentials: true }
      );
      if (res.data) {
        toast.success("Please check your email and reset your password", {
          autoClose: 1500,
        });
        reset();
      }

      console.log(res);
      // reset();
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
  };
  return (
    <>
      <div className="mt-24 p-3">
        <div>
          <img
            src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
            alt="profile pic"
            className="mx-auto w-1/2 sm:w-1/6"
          />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <h1 className="flex items-center justify-center gap-2">
            Name:{" "}
            <span className="font-semibold">{profileData?.user?.name}</span>{" "}
            <span className="text-xs">🟢</span>
          </h1>
          <h1>
            Email:{" "}
            <span className="font-semibold">{profileData?.user?.email}</span>
          </h1>

          <h1>
            Password: <span className="font-semibold">*******</span>
          </h1>
          {modal ? (
            <>
              <div className="mt-5 pb-5">
                <form
                  className="flex flex-col items-center justify-center gap-1 space-y-4 sm:gap-4 sm:space-y-1"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h2>Current Password</h2>
                  <input
                    type="text"
                    placeholder="Current password"
                    className="w-auto bg-slate-300 px-2 py-1 text-center outline-none sm:w-56 sm:p-2"
                    {...register("currentPassword", {
                      required: "Current password is required ",
                    })}
                  />
                  {/* <br /> */}
                  {errors.currentPassword && (
                    <span className="text-red-600">
                      {errors.currentPassword.message}
                    </span>
                  )}

                  <h2>New Password</h2>
                  <input
                    type="text"
                    placeholder="New password"
                    className="w-auto bg-slate-300 px-2 py-1 text-center outline-none sm:w-56 sm:p-2"
                    {...register("newPassword", {
                      required: "New password is required ",
                    })}
                  />

                  {errors.newPassword && (
                    <span className="text-red-600">
                      {errors.newPassword.message}
                    </span>
                  )}
                  <h2>Confirm new password</h2>
                  <input
                    type="text"
                    placeholder="New password"
                    className="w-auto bg-slate-300 px-2 py-1 text-center outline-none sm:w-56 sm:p-2"
                    {...register("confirmNewPassword", {
                      required: "Confirm new password",
                    })}
                  />
                  {errors.confirmNewPassword && (
                    <span className="text-red-600">
                      {errors.confirmNewPassword.message}
                    </span>
                  )}

                  <button
                    type="submit"
                    className="bg-orange-500 px-3 py-1 text-white sm:px-4 sm:py-2"
                  >
                    Change password
                  </button>
                </form>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="mx-auto mt-3 flex flex-col gap-6 sm:flex-row sm:gap-16">
            {!modal ? (
              <button
                className="bg-orange-500 px-3 py-1 text-white sm:px-4 sm:py-2"
                onClick={() => setModal(!modal)}
              >
                Change password
              </button>
            ) : (
              <button
                className="bg-orange-500 px-5 py-1 text-white sm:w-28 sm:px-4 sm:py-2"
                onClick={() => setModal(!modal)}
              >
                Back
              </button>
            )}

            <form onSubmit={handleSubmit(onForget)}>
              {resetPass ? (
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-auto bg-slate-300 px-2 py-1 text-center outline-none sm:w-56 sm:p-2"
                  {...register("email", {
                    required: "Enter your email",
                  })}
                />
              ) : (
                ""
              )}
              {resetPass ? (
                <button className="bg-orange-500 px-3 py-1 text-white sm:px-4 sm:py-2">
                  Reset Password
                </button>
              ) : (
                <button
                  className="bg-orange-500 px-3 py-1 text-white sm:px-4 sm:py-2"
                  onClick={resetPassword}
                >
                  Forget password
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
