import { useState } from 'react';

import { Link } from 'react-router-dom';

import useCartStore, { Item } from '../states/searching';

const Header = () => {
  const item: Item = {
    name: "teste",
    status: false,
  };
  const [searching, setSearhStatus] = useCartStore((state) => [
    state.searching,
    state.setSearchStatus,
  ]);

  const [show, setShow] = useState(10);
  const [nameInput, setNameInput] = useState("");

  const handleIncrement = () => {
    setShow((prevValue) => Math.min(prevValue + 5, 20));
  };

  const handleDecrement = () => {
    setShow((prevValue) => Math.max(prevValue - 5, 5));
  };

  const handleChange = (data: React.ChangeEvent<HTMLInputElement>) => {
    const input = data.target.value;
    setNameInput(() => input);

    if (input.trim() === "") {
      setSearhStatus({ name: "", status: false });
      return;
    }

    if (input.trim() !== searching.name) {
      item.name = input.trim();
      item.status = true;
      setSearhStatus(item);
      return;
    } else {
      item.status = false;
      setSearhStatus(item);
    }
  };

  return (
    <>
      <header className=" flex flex-row justify-between px-4   items-center">
        <div className="flex flex-row gap-4 items-center">
          {/*show input*/}
          <div className="relative">
            <label className="pr-1 f" htmlFor="">
              Show
            </label>
            <input
              type="number"
              id=""
              min="5"
              max="20"
              step="5"
              value={show}
              className="w-16 text-white  bg-[#141432] pl-1 pr-2 rounded-md  items-center appearance-none"
              onChange={() => null}
            />

            <div className="absolute top-0 right-0 flex h-full mt-0.5 p-0 pr-2 left-16 items-center">
              <div
                onClick={handleDecrement}
                className="bg-[#141432] p-1 pt-0 rounded-l-md cursor-pointer"
              >
                <svg
                  className="fill-current w-3 h-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
              <div
                onClick={handleIncrement}
                className="bg-[#141432] p-1 pt-0 rounded-r-md  cursor-pointer"
              >
                <svg
                  className="fill-current w-3 h-3 text-white transform rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>
          </div>

          {/*search input*/}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pl-2 left-0 w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="100"
                viewBox="0 0 50 50"
                className="fill-white"
              >
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
            </div>
            <label htmlFor=""></label>
            <input
              type="text"
              className=" bg-transparent outline-none border border-zinc-50 rounded-xl w-full  py-1 px-2 leading-tight focus:outline-none pl-9 text-white leading-tight"
              placeholder="Search..."
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Link to={"/form"}>
            <button className="bg-[#624DE3] p-1 px-1.5 pr-2 rounded-md text-md text-white text-center items-center leading-normal ">
              <span className="text-3xl leading-none relative items-center inline-block pr-1 top-0.5">
                +{" "}
              </span>
              Add Product
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
