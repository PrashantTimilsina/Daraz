import { useData } from "../context/Context";
// import sale from "./../../public/sale.json";
import Card from "./Card";
function Sale() {
  const { saleData, setIsForYou } = useData();

  return (
    <>
      <div
        className="container mx-auto mt-4 max-w-screen-2xl p-3"
        onClick={() => setIsForYou(false)}
      >
        <div className="ml-5 text-2xl">Flash Sale</div>
        <div className="mt-5 w-full border bg-white p-7">
          <h2 className="font-semibold text-[#F57224]">On Sale Now</h2>
          <hr className="mt-6" />
          {/*CARDS*/}

          <Card sale={saleData} />
        </div>
      </div>
    </>
  );
}

export default Sale;
