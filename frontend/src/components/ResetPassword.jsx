import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  const { token } = useParams();
  console.log(token);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      if (!data) return;
      const res = await axios.post(
        `https://daraz-backend-lsuk.onrender.com/user/reset/${token}`,
        data,
        { withCredentials: true }
      );
      toast.success("Password changed successfully", { autoClose: 1500 });
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
  };
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-8 border-2 border-black p-4 sm:w-1/2"
      >
        <h1 className="mx-auto text-xl font-semibold">Reset Password </h1>
        <div className="space-y-4">
          <p>Enter new password</p>

          <input
            type="text"
            placeholder="Enter new password"
            {...register("newPassword", { required: true })}
            className="bg-slate-200 p-2 px-3 outline-none"
          />
          <br />
          {errors.newPassword && (
            <span className="p-1 text-red-600">This field is required</span>
          )}
        </div>
        <div className="space-y-4">
          <p>Confirm new password</p>
          <input
            type="text"
            placeholder="Confirm new password"
            {...register("confirmNewPassword", { required: true })}
            className="bg-slate-200 p-2 px-3 outline-none"
          />
          <br />
          {errors.confirmNewPassword && (
            <span className="p-1 text-red-600">This field is required</span>
          )}
        </div>

        <button className="bg-orange-500 px-5 py-2 text-white">
          Change password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
