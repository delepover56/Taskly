import { useState } from "react";

const Header = () => {
  const [IsOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  return (
    <>
      <header className="hidden sm:flex justify-between items-center px-6 py-4 border-b border-gray-600">
        <div className="w-1/3 sm:w-1/6">
          <img
            className="w-full h-auto"
            src="./Taskly-darkmode-logo.png"
            alt="Taskly"
          />
        </div>
        <div className="rounded-full bg-blue-600 px-4 py-3">
          <p className="taskly-heading text-white text-2xl xl:text-2xl">JD</p>
        </div>
      </header>

      <div className="relative sm:hidden flex flex-col ">
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-600">
          <div className="w-1/2">
            <img src="./Taskly-darkmode-logo.png" alt="Taskly" />
          </div>
          <button onClick={toggleMenu} className="rounded-full bg-blue-600 p-4">
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-white"></span>
              <span className="block h-0.5 w-5 bg-white"></span>
              <span className="block h-0.5 w-5 bg-white"></span>
            </div>
          </button>
        </header>
        {IsOpen && (
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/50 z-40 md:hidden -top-3.5 -left-3.5 w-screen h-screen"
          ></div>
        )}

        <nav
          className={`fixed w-5/6 h-screen top-0 right-0 z-50 taskly-glass p-6 transition-transform duration-300
            flex flex-col justify-start items-center gap-5
            ${IsOpen ? "translate-x-0" : "translate-x-full -mr-4"}`}
        >
          <div className="flex justify-between items-center w-full">
            <div
              className="
          w-1/2
          "
            >
              <img src="./Taskly-darkmode-logo.png" alt="Taskly" />
            </div>
            <div className="flex justify-center items-center w-max">
              <button
                className="bg-blue-600 px-4 py-2.5  text-white text-xl rounded-full"
                onClick={toggleMenu}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center gap-5 w-full h-full py-5 px-5">
            <h1 className="bg-blue-600 px-4 py-6 rounded-full taskly-heading text-white text-9xl xl:text-2xl">
              JD
            </h1>
            <h1 className="bg-sky-200/30 taskly-para rounded-lg w-full text-center text-white text-2xl py-2 px-3">
              Jumbo Dumbo
            </h1>
            <h1 className="bg-sky-200/30 taskly-para rounded-lg w-full text-center text-white text-2xl py-2 px-3">
              @dumb-dude
            </h1>
          </div>
          {/* Containers for buttons such as light/dark toggle, Settings, and Logout */}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-white"
            >
              <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"></path>
            </svg>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
