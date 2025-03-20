import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Foryou from "./components/Foryou";
import Navbar from "./components/Navbar";
import Sale from "./components/Sale";
import Slider from "./components/Slider";

function Home() {
  return (
    <>
      <Slider />
      <Sale />
      <Categories />
      <Foryou />
    </>
  );
}

export default Home;
