import { IoMdClose } from "react-icons/io";
import { useData } from "../context/Context";
import { toast } from "react-toastify";
function Modal() {
  const { setIsVisible } = useData();
  function handleYes() {
    setIsVisible(false);
    toast.success("Item will be delivered within 24hr", { autoClose: 2000 });
  }
  return (
    <div className="container absolute top-[550px] z-20 w-auto bg-white p-4 shadow-xl sm:right-60 sm:top-80 sm:-mt-52 sm:w-1/2">
      <div
        className="flex cursor-pointer justify-end text-xl"
        onClick={() => setIsVisible(false)}
      >
        <IoMdClose />
      </div>
      <h2 className="text-center text-2xl">
        Are you sure you want to buy this item?
      </h2>
      <div className="mx-5 mt-8 flex justify-center space-x-16">
        <button
          className="rounded-sm bg-green-500 px-9 py-2 text-black"
          onClick={handleYes}
        >
          YES
        </button>
        <button
          className="rounded-sm bg-black px-9 py-2 text-white"
          onClick={() => setIsVisible(false)}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default Modal;
