import "../styles/Checkbox.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import productService, {
  createProduct,
  updateConfig,
} from "../services/productService";
import Loader from "./common/Loader";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const createProductFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório").nullable(),
  price: z.coerce.number().refine((value) => value > 0, {
    message: "O preço deve ser maior que zero.",
  }),
  description: z
    .string()
    .nonempty("A descrição é obrigatória")
    .refine((value) => value.trim().length > 0, {
      message: "A descrição não pode estar vazia.",
    })
    .nullable(),
  available: z.boolean(),
});

export type CreateProductFormData = z.infer<typeof createProductFormSchema>;

const FormEdit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(false);

  const { id } = useParams();

  const mutationPut = useMutation({
    mutationFn: ({ name, price, description, available }: updateConfig) => {
      return productService
        .update({ name, description, price, available }, id)
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error("erro ao editar produto", toastOptions);
      } else {
        toast.success("Produto editado com sucesso!", toastOptions);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("erro ao editar produto", toastOptions);
    },
  });

  //GET/:ID
  const { data, isLoading, isError } = useQuery(
    "one",
    () => productService.get(id).then((response) => response.data),
    {
      enabled: true,
      retry: 0,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductFormSchema),
  });

  useEffect(() => {
    if (data) {
      // setName(data.name);
      // setDescription(data.description);
      // setPrice(data.price);
      // setAvailable(data.available);

      setValue("name", data.name);
      setValue("description", data.description);
      setValue("price", data.price);
      setValue("available", data.available);
    }
  }, [data]);

  if (isLoading) {
    return (
      <main className="h-screen w-screen max-w-screen max-h-screen overflow-hidden py-5 flex flex-col  items-center gap-1  bg-[#1D1E42] ">
        <div className="flex flex-col gap-2 w-11/12  h-full p-2 transition-all duration-300 mb-5">
          <h1 className="p-3 ¨ font-bold text-emerald-200 leading-light text-left text-4xl transition-all duration-300">
            ProductsApp
          </h1>

          <Loader />
        </div>
      </main>
    );
  }

  if (isError) {
    console.log("erro em");
    return;
  }

  const updateProduct = (data: createProduct) => {
    mutationPut.mutate(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(updateProduct)}
        data-aos="fade-down"
        className="w-full"
        style={{ maxWidth: "900x", margin: "0 auto" }}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="w-full px-3">
              <label
                htmlFor="name"
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
              >
                Nome
              </label>
              <input
                {...register("name")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(event) => setName(event?.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="w-full px-3 mt-4">
              <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                Preço
              </label>
              <input
                {...register("price")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Preço..."
                onChange={(event) => setPrice(event?.target.value)}
              />
              {errors.price && (
                <p className="text-red-500 text-xs italic mt-3">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="w-full px-3">
              <div className="flex items-center mt-10 ">
                <label className="container">
                  Disponível
                  <input
                    type="checkbox"
                    {...register("available")}
                    onChange={(event) => setAvailable(event?.target.checked)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                Descrição
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                {...register("description")}
              ></textarea>

              {errors.description && (
                <p className="text-red-500 text-xs italic mt-3">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <button className="bg-[#624DE3] w-2/4 p-1 px-1.5 pr-2 rounded-md text-md text-white text-center items-center leading-normal ">
              <span className="text-3xl leading-none relative items-center inline-block pr-1 top-0.5">
                +{" "}
              </span>
              Save edit
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormEdit;
