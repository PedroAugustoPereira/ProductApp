import { create } from 'zustand';

export type NumPage = {
  atualPage: number;
  perPage: number;
  total: number;
};

export type UsePage = {
  dataPage: NumPage;
  setDataPage: (page: NumPage) => void;
};

const usePage = create<UsePage>((set) => ({
  dataPage: { atualPage: 1, perPage: 10, total: 0 },
  setDataPage: (item: NumPage) => set(() => ({ dataPage: item })),
}));

export default usePage;
