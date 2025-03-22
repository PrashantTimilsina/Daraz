import axios from "axios";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdDeliveryDining } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { CiLocationOff } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom";
import { MdEventAvailable } from "react-icons/md";
import { useData } from "../context/Context";
import { toast } from "react-toastify";

function Description() {
  const [description, setDescription] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  // const image = location?.state?.image || description?.image;
  // const title = location?.state?.title || description?.title;
  // const price = location?.state?.price || description?.price;
  const image = description?.image;
  const title = description?.title;
  const price = description?.price;

  const { id, setAddedMovies, addedMovies } = useData();
  const { id: paramId } = useParams();
  const fetchId = paramId || id;
  const discountPercentage = location?.state?.discount;

  function handleAddToCart() {
    // console.log(image, title);
    const alreadyPresent = addedMovies.some((item) => item.title === title);
    if (alreadyPresent) {
      toast.error("Item is already present in cart", { autoClose: 1500 });
      return;
    }
    setAddedMovies((addedMovies) => [
      {
        image,
        title,
        quantity,
        price,
        discountPercentage,
      },
      ...addedMovies,
    ]);
    toast.success("Item added to cart", {
      autoClose: 1500,
    });
  }
  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);
  // console.log(addedMovies);

  function handleAdd() {
    if (quantity <= 9) setQuantity((quantity) => quantity + 1);
    return;
  }
  function handleMinus() {
    if (quantity > 1) setQuantity((quantity) => quantity - 1);
    return;
  }
  useEffect(() => {
    async function fetchDescription() {
      try {
        const category = discountPercentage ? "sale" : "product";
        const res = await axios.get(
          `http://localhost:8000/${category}/${fetchId}`
        );
        if (category === "sale") {
          // console.log(res?.data?.data?.sale);
          setDescription(res?.data?.data?.sale);
        } else {
          // console.log(res?.data?.data?.product[0]);
          setDescription(res?.data?.data?.product[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchDescription();
  }, [fetchId, discountPercentage]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mt-44 grid gap-9 p-4 sm:grid-cols-3">
        {/*image section*/}
        <div>
          <img
            src={description?.image}
            alt="product image"
            className="h-96 w-96 object-contain p-2"
          />
        </div>
        {/*middleOne*/}
        <div
          className={` ${
            discountPercentage
              ? "p-2 text-2xl space-y-5 mt-12"
              : "space-y-6 mt-16"
          }`}
        >
          <h1 className="text-2xl">{description?.title}</h1>
          <div className="rating mt-5">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              defaultChecked
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
          <h1 className="-mt-1 text-[1rem]">
            Click on star to review our product prices.
          </h1>

          {discountPercentage && (
            <h2 className="text-3xl text-orange-500 sm:mt-9">
              Rs{" "}
              {Math.floor(
                ((100 - description?.discountPercentage) * description?.price) /
                  100
              )}
            </h2>
          )}
          <div className="mt-3 flex items-center gap-4 p-1">
            <h2
              className={`${
                discountPercentage
                  ? "line-through sm:mt-2"
                  : "text-orange-600 text-2xl"
              }`}
            >
              Rs {description?.price}
            </h2>
            {discountPercentage && (
              <h2 className="text-xl">- {description?.discountPercentage}%</h2>
            )}
          </div>
          {/*Quantity wala*/}
          <div className="mt-4 flex items-center gap-6">
            <h2>Quantity</h2>
            <div className="ml-3 flex gap-2">
              <button className="text-2xl font-bold" onClick={handleMinus}>
                -
              </button>
              <input
                type="number"
                className="w-14 text-center sm:w-20"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button className="text-2xl font-bold" onClick={handleAdd}>
                +
              </button>
            </div>
          </div>
          <div className="mt-7 space-x-2">
            <button className="rounded-sm bg-[#26ABD4] px-5 py-2 text-xl text-white sm:w-48">
              Buy Now
            </button>
            <button
              className="rounded-sm bg-[#F85606] px-5 py-2 text-xl text-white sm:w-48"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/*last wala*/}
        <div className="p-3 text-xl">
          <div className="space-y-3">
            <h2 className="text-[1rem]">Delivery Options</h2>
            <div className="flex items-center gap-4 pt-3">
              <CiLocationOn />
              <p>{description?.location}</p>
            </div>
            <div className="flex items-center gap-4 pt-3">
              <MdDeliveryDining />
              <p className="">
                Standard Delivery <br />
                <span>Guaranteed by 19-21 Dec</span>
                <span className="ml-5 text-orange-500">Rs 120</span>
              </p>
            </div>
            <div className="flex items-center gap-4 pt-3">
              <BsCash />
              <p>
                Cash on Delivery{" "}
                {description?.cashOnDelivery ? "Available" : "not available"}
              </p>
            </div>
            {/*REUTRN AND WARRANTY*/}
            <div className="pt-4">
              <p className="text-[1rem]">Return & Warranty</p>
              <div className="mt-3 flex items-center gap-5">
                <GiReturnArrow />
                <p>14 Days Free Returns</p>
              </div>
              <div className="mt-3 flex items-center gap-5">
                {description?.warrantyAvailable ? (
                  <>
                    <MdEventAvailable /> <p>Warranty available</p>
                  </>
                ) : (
                  <>
                    <CiLocationOff />
                    <p>Warranty not available</p>
                  </>
                )}
              </div>
              <div className="mt-4 flex h-48 w-48">
                <img src="/myQr.png" alt="QR image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
