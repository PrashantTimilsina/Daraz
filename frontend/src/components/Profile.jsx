function Profile() {
  const name = JSON.parse(localStorage.getItem("name"));
  const email = JSON.parse(localStorage.getItem("email"));

  return (
    <>
      <div className="mt-24 p-3">
        <div>
          <img
            src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
            alt="profile pic"
            className="mx-auto w-1/6"
          />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <h1 className="flex items-center justify-center gap-2">
            Name: <span className="font-semibold">{name}</span>{" "}
            <span className="text-xs">🟢</span>
          </h1>
          <h1>
            Email: <span className="font-semibold">{email}</span>
          </h1>

          <h1>
            Password: <span className="font-semibold">*******</span>
          </h1>
          <div className="mx-auto mt-3 flex flex-col gap-6 sm:flex-row sm:gap-16">
            <button className="bg-orange-500 px-3 py-1 text-white sm:px-4 sm:py-2">
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
