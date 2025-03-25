function Loader() {
  return (
    <div className="absolute flex h-screen w-full items-center justify-center">
      <span className="loading loading-infinity loading-xs"></span>
      <span className="loading loading-infinity loading-sm"></span>
      <span className="loading loading-infinity loading-md"></span>
      <span className="loading loading-infinity loading-lg"></span>
      <span className="loading-xl loading loading-infinity"></span>
    </div>
  );
}

export default Loader;
