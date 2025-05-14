import axios from "axios";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Admin() {
  const [searchData, setSearchData] = useState([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [disable, setDisable] = useState(true);

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/user/search/${data.id}`,
        {
          withCredentials: true,
        }
      );

      setName(res?.data?.user?.name);
      setUserId(data?.id);

      console.log(res.data);
      setSearchData(res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
  };
  async function update(e) {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8000/user/update/${userId}`,
      { newName: name },
      { withCredentials: true }
    );
    if (res?.data) {
      toast.success("User data has been updated", { autoClose: 1500 });
      setDisable(true);
    }
  }
  function edit() {
    setDisable(false);
  }
  async function deleteUser() {
    const res = await axios.delete(
      "http://localhost:8000/user/deleteuser",
      {
        data: { id: userId },
      },
      { withCredentials: true }
    );
    if (res?.data) {
      toast.success(res?.data?.message, { autoClose: 1500 });
    }
  }
  return (
    <div className="mt-3 min-h-screen bg-slate-950 p-3 text-center text-slate-200">
      <div className="text-2xl">ADMIN PANEL</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center gap-5 py-3 text-2xl">
          <input
            type="text"
            placeholder="Enter user Id"
            className="w-1/3 rounded-md p-2 text-black outline-none"
            {...register("id", { required: true })}
          />
          <br />
          {errors.id && (
            <span className="p-1 text-red-600">This field is required</span>
          )}
          <button className="rounded-sm bg-white px-6 py-2 text-black">
            Search
          </button>
        </div>
      </form>

      {/*Cards to be displayed*/}

      <div>
        {searchData?.user && (
          <div className="mx-auto mt-10 w-[80%] space-y-2 border border-white p-4">
            <h1>Email: {searchData?.user?.email}</h1>
            {/* <h1>Name: {searchData?.user?.name}</h1> */}
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`border-none  p-1 outline-none ${
                  disable ? "bg-transparent" : "text-black"
                }`}
                disabled={disable}
                spellCheck="false"
              />
            </label>

            <h1>Role: {searchData?.user?.role.toUpperCase()}</h1>
            <h1>Id: {searchData?.user?._id}</h1>
            <div className="space-x-7">
              <button
                className="my-3 cursor-pointer rounded bg-blue-500 px-6 py-1 text-white hover:bg-blue-600 sm:w-auto"
                onClick={edit}
              >
                Edit
              </button>
              <button
                className="my-3 cursor-pointer rounded bg-blue-500 px-6 py-1 text-white hover:bg-blue-600 sm:w-auto"
                onClick={update}
              >
                Update
              </button>
              <button
                className="my-3 cursor-pointer rounded bg-blue-500 px-6 py-1 text-white hover:bg-blue-600 sm:w-auto"
                onClick={deleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
