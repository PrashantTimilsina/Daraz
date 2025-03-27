import { useData } from "../context/Context";
// import product from "./../../public/products.json";
import Card from "./Card";
function Foryou() {
  const { productData } = useData();

  return (
    <>
      <div className="container mx-auto mt-7 max-w-screen-2xl p-3">
        <div className="ml-5 pb-2 text-xl">
          <h2>Just For You</h2>
        </div>
        <div>
          {/*CARDS COMPONENT TO BE RENDERED*/}

          <div>
            <Card sale={productData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Foryou;
