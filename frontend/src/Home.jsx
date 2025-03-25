import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Foryou from "./components/Foryou";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Sale from "./components/Sale";
import Slider from "./components/Slider";
import { useData } from "./context/Context";

function Home() {
  const { isLoading } = useData();
  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Slider />
          <Sale />
          <Categories />
          <Foryou />
        </>
      )}
    </>
  );
}

export default Home;
