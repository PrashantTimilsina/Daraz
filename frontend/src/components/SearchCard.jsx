import { useData } from "../context/Context";
import CategoryCard from "./CategoryCard";

function SearchCard() {
  const { text, productData } = useData();

  const filteredProducts = productData.filter((item) =>
    item.title.toLowerCase().includes(text.toLowerCase())
  );

  console.log(filteredProducts);

  return (
    <>
      <CategoryCard filterData={filteredProducts} />
      <div className="-mt-8 p-4">
        {filteredProducts.length < 1 && (
          <p className="text-xl font-semibold">Item is not available❌</p>
        )}
      </div>
    </>
  );
}

export default SearchCard;
