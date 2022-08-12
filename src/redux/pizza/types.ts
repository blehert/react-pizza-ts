export type Pizza = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
