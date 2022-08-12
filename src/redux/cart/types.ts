export type CartItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
