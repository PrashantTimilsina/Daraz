import { FaFacebook } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className="flex h-12 items-center justify-center gap-4 bg-[#F85506] text-center">
        <p className="text-xl text-white">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
        <a href="https://www.facebook.com/prashant.timilsina.752">
          <FaFacebook className="text-xl text-white" />
        </a>
      </div>
    </>
  );
}

export default Footer;
