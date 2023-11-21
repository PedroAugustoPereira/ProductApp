import "../styles/Checkbox.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import productService, { createProduct } from "../services/productService";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const createProductFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  price: z.coerce.number().refine((value) => value > 0, {
    message: "O preço deve ser maior que zero.",
  }),
  description: z
    .string()
    .nonempty("A descrição é obrigatória")
    .refine((value) => value.trim().length > 0, {
      message: "A descrição não pode estar vazia.",
    }),
  available: z.boolean(),
});

export type CreateProductFormData = z.infer<typeof createProductFormSchema>;

const FormCreate = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();
  console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductFormSchema),
  });

  //POST
  const mutationPost = useMutation({
    mutationFn: ({ name, price, description, available }: createProduct) => {
      return productService
        .create({ name, description, price, available })
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error("erro ao criar produto", toastOptions);
      } else {
        toast.success("Produto cadastrado com sucesso!", toastOptions);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("erro ao criar produto", toastOptions);
    },
  });

  const createProduct = (data: createProduct) => {
    mutationPost.mutate(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(createProduct)}
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
                  <input type="checkbox" {...register("available")} />
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
              Add Product
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormCreate;
