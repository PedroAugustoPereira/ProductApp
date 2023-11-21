import Api from "./Api";

export interface productInterface {
  id: number | string;
  name: string;
  description: string;
  price: string;
  available: boolean;
}

export type createProduct = {
  name: string;
  description: string;
  price: number;
  available: boolean;
};

export type updateConfig = {
  id?: string | undefined;
  name: string;
  price: string | number;
  description: string;
  available: boolean;
};

const productService = {
  getAll: async (page: number, perPage: number) => {
    const res = await Api.get(`/?page=${page}&perPage=${perPage}`).catch(
      (err) => {
        if (err.response.status === 400) {
          return err.response.status;
        }
        return err;
      }
    );

    return res;
  },

  get: async (id: number | string | undefined) => {
    const res = await Api.get(`/get/${id}`).catch((err) => {
      if (err.response.status === 400) {
        return err.response.status;
      }
      return err;
    });

    console.log(res);

    return res;
  },

  serach: async (name: string, page: number, perPage: number) => {
    const res = await Api.get(
      `/search?name=${name}&page=${page}&perPage=${perPage}`
    ).catch((err) => {
      if (err.response.status === 400) {
        return err.response.status;
      }
      return err;
    });

    console.log(res);

    return res;
  },

  create: async (params: createProduct) => {
    const res = await Api.post(`/create`, params).catch((err) => {
      if (err.status === 400) {
        return err.response.status;
      }
      return err;
    });

    return res;
  },

  update: async (params: updateConfig, id: number | string | undefined) => {
    const res = await Api.put(`/update/${id}`, params).catch((err) => {
      if (err.status === 400) {
        return err.response.status;
      }
      return err;
    });

    return res;
  },

  remove: async (id: number | string | undefined) => {
    const res = await Api.delete(`/${id}`).catch((err) => {
      if (err.status === 400) {
        return err.response.status;
      }
      return err;
    });

    return res;
  },
};

export default productService;
