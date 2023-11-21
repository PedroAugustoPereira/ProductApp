import "react-toastify/dist/ReactToastify.css";

import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

import Cell from "../components/Cell";
import Row from "../components/Row";
import productService, { productInterface } from "../services/productService";

interface TableProps {
  data: productInterface[];
}

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Table = ({ data }: TableProps) => {
  const navigate = useNavigate();

  const mutationPut = useMutation({
    mutationFn: (id) => {
      return productService.remove(id).then((response) => response.data);
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error("erro ao remover produto", toastOptions);
      } else {
        toast.success("Produto removido com sucesso!", toastOptions);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("erro ao remover o produto", toastOptions);
    },
  });

  const handleRemove = (element: React.MouseEvent<HTMLInputElement>) => {
    const id = element.currentTarget.id;
    mutationPut.mutate(id);
  };

  return (
    <>
      {/*START TABLE */}

      <div className="overflow-auto ">
        <div
          style={{ minWidth: "800px" }}
          data-aos="fade-down"
          data-aos-duration="1000"
          className=" flex h-full flex-col  pb-3 overflow-y-scroll rounded-md "
        >
          <Row id="main" styles="mt-1">
            <Cell pStyles="font-bold text-lg" name="Tracking ID" />
            <Cell pStyles="font-bold text-lg" name="Name" />
            <Cell pStyles="font-bold text-lg" name="Price" />
            <Cell pStyles="font-bold text-lg" name="Status" />
            <Cell pStyles="font-bold text-lg" name="Actions" />
          </Row>

          <div className="w-full flex flex-col overflow-y-auto h-full py-1 rounded-md transition-all duration-300 scrollbar-thin">
            {data.map((value: productInterface, index: number) => (
              <>
                <Row
                  styles={index % 2 !== 0 ? `bg-[#26264F]` : ""}
                  id={`${value.id}`}
                >
                  <Cell name={` #${value.id}`} />
                  <Cell name={value.name} />
                  <Cell name={`R$ ${value.price}`} />
                  <Cell
                    pStyles={`rounded-lg p-2 ${
                      value.available ? "bg-green-500" : "bg-red-500"
                    }  `}
                    name={value.available ? `Disponível` : `Indisponível`}
                  />
                  <Cell name="">
                    <div
                      key={value.id}
                      className="flex flex-row justify-center items-center gap-3"
                    >
                      <Link to={`/form/${value.id}`}>
                        <button id={`update/${value.id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            className="fill-emerald-200"
                          >
                            <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                          </svg>
                        </button>
                      </Link>

                      <button onClick={handleRemove} id={`delete/${value.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          className="fill-red-500"
                        >
                          <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                      </button>
                    </div>
                  </Cell>
                </Row>
              </>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
      {/*END TABLE */}
    </>
  );
};

export default Table;
