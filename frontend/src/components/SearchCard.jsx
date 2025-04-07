import { useData } from "../context/Context";
import { useLocal } from "../context/LocalContext";
import CategoryCard from "./CategoryCard";

function SearchCard() {
  const { productData } = useData();
  const { text } = useLocal();

  const filteredProducts = productData.filter((item) => {
    const searchWords = text.toLowerCase().split(" ");
    const title = item.title.toLowerCase();
    return searchWords.every((word) => title.includes(word));
  });

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
