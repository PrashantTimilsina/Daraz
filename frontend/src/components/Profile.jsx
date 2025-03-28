import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Profile() {
  const [profileData, setProfileData] = useState([]);
  const [modal, setModal] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
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
                <form className="flex flex-col items-center justify-center gap-5 space-y-1 sm:space-y-2 lg:flex-row">
                  <h2 className="mt-4">Current Password</h2>
                  <input
                    type="text"
                    placeholder="Current password"
                    className="w-auto bg-slate-300 px-2 py-1 text-center outline-none sm:w-56 sm:p-2"
                    {...register("currentPassword", {
                      required: "Current password is required is required",
                    })}
                  />
                  <br />
                  {errors.currentPassword && (
                    <span className="p-1 text-red-600">
                      This field is required
                    </span>
                  )}
                  <h2>New Password</h2>
                  <input
                    type="text"
                    placeholder="New password"
                    className="w-auto bg-slate-300 px-2 py-1 text-center outline-none sm:w-56 sm:p-2"
                  />
                  <h2>Confirm new password</h2>
                  <input
                    type="text"
                    placeholder="New password"
                    className="w-auto bg-slate-300 px-2 py-1 text-center outline-none sm:w-56 sm:p-2"
                  />
                </form>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="mx-auto mt-3 flex flex-col gap-6 sm:flex-row sm:gap-16">
            <button
              className="bg-orange-500 px-3 py-1 text-white sm:px-4 sm:py-2"
              onClick={() => setModal(!modal)}
            >
              Change password
            </button>
            <button className="bg-orange-500 px-3 py-1 text-white sm:px-4 sm:py-2">
              Reset password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
