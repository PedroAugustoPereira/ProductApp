import { create } from 'zustand';

export type Item = {
  name: string;
  status: boolean;
};

export type CartStore = {
  searching: Item;
  setSearchStatus: (item: Item) => void;
};

const useCartStore = create<CartStore>((set) => ({
  searching: { name: "", status: false },
  setSearchStatus: (item) => set(() => ({ searching: item })),
}));

export default useCartStore;
