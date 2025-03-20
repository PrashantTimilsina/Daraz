import { useNavigate } from "react-router-dom";
import { useData } from "../context/Context";

function Card({ sale }) {
  const navigate = useNavigate();
  const { setId } = useData();
  return (
    <>
      <div className="mt-2 grid gap-2 space-y-9 p-2 px-4 text-center xs:grid-cols-2 xs:grid-rows-3 sm:text-left md:grid-cols-4 md:grid-rows-2 lg:grid-cols-6 lg:grid-rows-1">
        {sale?.map((item) => (
          <div
            className="cursor-pointer space-y-2 p-2 shadow-xl duration-100 hover:scale-105 hover:border-4 hover:border-slate-100"
            key={item?.id}
            onClick={() => {
              navigate(`/product/${item?._id}`, {
                state: {
                  discount: item?.discountPercentage || null,
                  image: item?.image,
                  title: item?.title,
                  price: item?.price,
                  cashOnDelivery: item?.cashOnDelivery,
                  warrantyAvailable: item?.warrantyAvailable,
                  location: item?.location,
                },
              });
              setId(item?._id);
            }}
          >
            <img
              src={item?.image}
              alt="image picture"
              className="mx-auto h-40 w-40 object-contain"
            />
            <p className="px-2 pt-1 font-semibold">{item?.title}</p>
            {item?.discountPercentage ? (
              <h2 className="px-4 text-xl font-semibold text-[#F57224]">
                Rs{" "}
                {Math.floor(
                  ((100 - item?.discountPercentage) * item?.price) / 100
                )}
              </h2>
            ) : (
              ""
            )}
            <ul className="flex gap-3 p-1 px-3">
              <h5
                className={`${
                  item.discountPercentage
                    ? "line-through text-slate-600 mx-auto sm:mx-0"
                    : "text-[#F57224] font-semibold"
                } `}
              >
                Rs {item?.price}
              </h5>
              {item?.discountPercentage ? (
                <p>-{item?.discountPercentage}%</p>
              ) : (
                ""
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
