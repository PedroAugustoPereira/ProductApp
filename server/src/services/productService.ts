import { literal, Op } from "sequelize";

import { Product } from "../models";
import { ProductCreationAttributes } from "../models/Product";

const productService = {
  getForTime: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { rows, count } = await Product.findAndCountAll({
      attributes: ["id", "name", "description", "price", "available"],
      order: [["updatedAt", "DESC"]],
      limit: perPage,
      offset,
    });

    return {
      products: rows,
      page: page,
      perPage: perPage,
      total: count,
    };
  },

  getProduct: async (id: string) => {
    const product = await Product.findByPk(id);
    return product;
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Product.findAndCountAll({
      attributes: ["id", "name", "description", "price", "available"],

      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      order: [
        [literal(`CASE WHEN "name" ILIKE '${name}%' THEN 0 ELSE 1 END`), "ASC"],
        ["name", "ASC"],
      ],
      limit: perPage,
      offset,
    });

    return {
      products: rows,
      page,
      perPage,
      total: count,
    };
  },

  create: async (attributes: ProductCreationAttributes) => {
    const product = Product.create(attributes);
    return product;
  },

  update: async (
    id: string,
    attributes: {
      name: string;
      description: string;
      price: number;
      available: boolean;
    }
  ) => {
    const [affectedRows, updatedRows] = await Product.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedRows[0];
  },

  verifyName: async (name: string) => {
    const product = await Product.findOne({
      where: { name },
    });

    return product;
  },

  removeProduct: async (id: string) => {
    const product = await Product.destroy({
      where: { id },
    });

    if (product == 0) {
      throw new Error("Nenhum registro encontrado com esse id");
    }

    return product;
  },
};

export default productService;
