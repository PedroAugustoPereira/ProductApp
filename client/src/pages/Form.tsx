import "../styles/Checkbox.css";
import "react-toastify/dist/ReactToastify.css";

import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import FormCreate from "../components/FormCreate";
import FormEdit from "../components/FormEdit";

const Form = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <>
        <main className="h-screen w-screen max-w-screen max-h-screen overflow-hidden py-5 flex flex-col  items-center gap-1  bg-[#1D1E42] ">
          <div className="flex flex-col gap-2 w-11/12  h-full p-2 transition-all duration-300 mb-5">
            <h1 className="p-3 ¨ font-bold text-emerald-200 leading-light text-left text-4xl transition-all duration-300">
              ProductsApp
            </h1>

            <Link data-aos="fade-down" to={"/"}>
              <div
                style={{ borderRadius: "50%" }}
                className="w-9 h-9 border-solid border-2 border-spacing-1 border-zinc-100 flex items-center justify-center mx-2 mb-6 cursor-pointer"
              >
                <img
                  style={{ filter: "invert(1)" }}
                  className="w-10/12 "
                  src="/arrow_left.svg"
                  alt=""
                />
              </div>
            </Link>

            {id ? <FormEdit /> : <FormCreate />}
          </div>
        </main>
      </>
      <ToastContainer />
    </div>
  );
};

export default Form;
