import { useNavigate } from "react-router-dom";
import { useData } from "../context/Context";

function Categories() {
  const { setFilterData, productData } = useData();
  const navigate = useNavigate();
  function handleClick(e) {
    const category = e.target.closest("div").querySelector("h2").textContent;
    const filter = productData.filter((item) => item.category === category);
    setFilterData(filter);

    navigate("/category");
  }

  const data = [
    {
      id: 1,
      image:
        "https://signal.avg.com/hubfs/Blog_Content/Avg/Signal/AVG%20Signal%20Images/how_to_improve_your_gaming_pc_performance_2nd_refresh_signal/How_to_Improve_Your_Gaming_PC_Performance-Thumb.jpg",
      title: "Gaming",
    },
    {
      id: 2,
      image:
        "https://romebusinessschool.com/wp-content/uploads/2023/10/adwefdgv.webp",
      title: "Study Products",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ze5rawagklRQ4jFPZb3W01DcqhR0HvGY7w&s",
      title: "Clothes",
    },
  ];
  return (
    <>
      <div className="container mx-auto ml-6 max-w-screen-2xl p-4">
        <h1 className="text-center text-xl sm:text-left">Categories</h1>
        <div className="mt-2 grid w-auto items-center justify-center gap-6 p-2 text-center xs:grid-cols-2 sm:text-left md:w-full md:grid-cols-3 lg:w-1/2 lg:grid-cols-3">
          {/*CATEGORIES*/}
          {data.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer space-y-3 rounded-sm border-slate-200 p-3 shadow-xl duration-100 hover:scale-105 hover:border-2"
              onClick={handleClick}
            >
              <img
                src={item.image}
                className="h-52 w-52 rounded-sm object-cover"
              />
              <h2 className="font-xl px-3 font-semibold">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
