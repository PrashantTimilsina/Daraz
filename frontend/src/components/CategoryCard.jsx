import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CategoryCard({ filterData }) {
  //   const { filterData } = useData();
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="mt-40 grid grid-cols-2 justify-around gap-y-10 p-2 px-5 md:grid-cols-3 lg:grid-cols-4">
      {filterData?.map((item) => (
        <div
          key={item.id}
          className="flex w-auto cursor-pointer flex-col items-center gap-2 p-2 shadow-md duration-200 hover:scale-105 sm:w-72 md:w-52"
          onClick={() => navigate(`/product/${item._id}`)}
        >
          <img
            src={item?.image}
            alt="image"
            className="h-24 w-24 object-contain sm:h-48 sm:w-48"
          />
          <h1 className="font-semibold">{item?.title}</h1>
          <p className="font-semibold text-orange-500">RS {item?.price}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryCard;
