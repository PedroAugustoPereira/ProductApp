import {
  Request,
  Response,
} from 'express';

import { getPaginationParams } from '../helpers/getPaginationParams';
import productService from '../services/productService';

const productsController = {
  index: async (req: Request, res: Response) => {
    const [pageNumber, perPageNumber] = getPaginationParams(req.query);

    try {
      const paginetedProducts = await productService.getForTime(
        pageNumber,
        perPageNumber
      );

      return res.json(paginetedProducts);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  get: async (req: Request, res: Response) => {
    const id = req.params.id;

    if (id === null || id === undefined) {
      return res.status(400).json({ message: "invalid ID", error: true });
    }

    try {
      const product = await productService.getProduct(id);

      return res.json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  search: async (req: Request, res: Response) => {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      if (typeof name !== "string") {
        throw new Error("Pequisa inválida");
      }

      const products = await productService.findByName(name, page, perPage);

      return res.json(products);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  create: async (req: Request, res: Response) => {
    const { name, description, price, available } = req.body;

    try {
      const productAllreadyExists = await productService.verifyName(name);

      if (productAllreadyExists) {
        throw new Error("Já existe um produto cadastrado com esse nome!");
      }

      const product = await productService.create({
        name,
        description,
        price,
        available,
      });

      return res.json({ product, created: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message, created: false });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, available } = req.body;

    try {
      const product = await productService.update(id, {
        name,
        description,
        price,
        available,
      });

      return res.json({ product, updated: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message, updated: false });
      }
    }
  },

  remove: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id === null || id === undefined) {
      return res.status(400).json({ message: "invalid ID", error: true });
    }

    try {
      const product = await productService.removeProduct(id);
      return res.json({ removed: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message, removed: false });
      }
    }
  },
};

export default productsController;
