import { RiSearch2Line } from "react-icons/ri";
import { GoBell } from "react-icons/go";
import ThemeToggler from "../ui/ThemeToggler";
import { HiMenu } from "react-icons/hi";
const Header = () => {
  return (
    <header className=" sticky top-0 py-6 px-5 dark:bg-dark-secondary bg-white flex justify-between items-center z-40">
      <button className="text-3xl text-primary block lg:hidden">
        <HiMenu />
      </button>
      <h1 className="md:text-2xl text-xl dark:text-dark-text-primary text-black font-medium">
        Dashboard
      </h1>
      <div className="md:flex items-center gap-2 px-2 py-3 lg:w-1/4 w-1/3  md:block hidden dark:bg-dark-primary bg-gray-100 rounded-lg dark:border-0 border-2 border-gray-800/5 ">
        <span className="text-2xl dark:text-dark-text-primary text-primary">
          <RiSearch2Line />
        </span>
        <input
          type="text"
          placeholder="Search here.."
          className="w-full border-none outline-none dark:text-dark-text-primary text-gray-800 placeholder:font-medium"
        />
      </div>
      <div className="flex items-center md:gap-7 gap-4 relative ">
        <button className="md:text-3xl text-2xl relative dark:text-dark-text-primary">
          <GoBell />
          <div className="absolute size-5 flex justify-center items-center rounded-full bg-info text-sm text-white -right-2 -top-3">
            4
          </div>
        </button>
        <div>
          <img
            src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
            alt=""
            className="md:size-12 size-10 rounded-lg"
          />
        </div>
        <ThemeToggler />
      </div>
    </header>
  );
};

export default Header;
