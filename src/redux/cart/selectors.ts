import { RootState } from '../store';

export const cartSelector = (state: RootState) => state.cart;
export const cartItemByIdSelector = (id: number) => (state: RootState) =>
  state.cart.items.filter((obj: any) => obj.id === id);
