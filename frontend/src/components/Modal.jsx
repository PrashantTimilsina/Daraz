import { IoMdClose } from "react-icons/io";
import { useData } from "../context/Context";
import { toast } from "react-toastify";
function Modal() {
  const { setIsVisible, setDelivery, delivery } = useData();
  function handleYes() {
    if (delivery === "") {
      toast.error("Please fill the delivery location", { autoClose: 1500 });
      return;
    }
    setIsVisible(false);
    toast.success(`Item will be delivered to ${delivery} within 24hr`, {
      autoClose: 2000,
    });
    setDelivery("");
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
      <div className="mt-4 flex w-full items-center justify-center space-y-3 text-white">
        <input
          type="text"
          className="w-full rounded-sm bg-black px-4 py-1 text-[1rem] font-semibold sm:w-1/2"
          placeholder="Enter the delivery location"
          value={delivery}
          spellCheck="false"
          onChange={(e) => setDelivery(e.target.value)}
        />
      </div>
      <div className="mx-5 mt-8 flex justify-center space-x-16">
        <button
          className="rounded-sm bg-green-500 px-9 py-2 text-xl text-black"
          onClick={handleYes}
        >
          YES
        </button>
        <button
          className="rounded-sm bg-black px-9 py-2 text-xl text-white"
          onClick={() => setIsVisible(false)}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default Modal;
