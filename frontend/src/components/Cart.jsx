import { useEffect } from "react";
import { useData } from "../context/Context";

function Cart() {
  const { addedMovies, setAddedMovies } = useData();
  function handleRemoveFromCart(item) {
    const filter = addedMovies.filter((movies) => movies.title !== item);
    setAddedMovies(filter);
    localStorage.setItem("cart", JSON.stringify(filter));
  }
  useEffect(() => {
    if (addedMovies.length > 0)
      localStorage.setItem("cart", JSON.stringify(addedMovies));
  }, [addedMovies]);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    setAddedMovies(cart);
  }, []);

  const totalprice = addedMovies.reduce((acc, item) => {
    const discountPrice = Math.floor(
      ((100 - item?.discountPercentage) * item?.price) / 100
    );
    const price = item?.discountPercentage ? discountPrice : item.price;
    return acc + price * item?.quantity;
  }, 0);
  return (
    <>
      <h2 className="mt-32 px-6 text-end text-xl">
        Total Price:
        <span className="text-red-600 underline">{totalprice}</span>
      </h2>
      <div className="flex items-center gap-5 p-2 pb-9">
        {addedMovies.length < 1 && (
          <h1 className="mx-auto text-2xl font-semibold">
            No items added in the cart
          </h1>
        )}
        {addedMovies.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center space-y-3 rounded-sm p-3 shadow-2xl duration-100 hover:scale-105 hover:border-orange-500"
          >
            <img
              src={item?.image}
              alt="product image"
              className="h-48 w-48 object-contain"
            />
            <h2 className="text-xl font-semibold">{item?.title}</h2>
            <p className="text-red-600">
              Quantity:<span>{item?.quantity}</span>
            </p>
            <p className="text-orange-600">
              Price:<span>{item?.quantity * item?.price}</span>
            </p>
            <button
              className="w-36 rounded-sm bg-[#F85506] px-8 py-2 text-white"
              onClick={() => handleRemoveFromCart(item?.title)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cart;
