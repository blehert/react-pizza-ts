import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../components/utils/calcTotalPrice';
import { getCartFromLS } from '../../components/utils/getCartFromLocalStorage';
import { CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cartcart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const findItem = state.items.find((obj) => {
        return obj.id === payload.id && obj.size === payload.size && obj.type === payload.type;
      });
      findItem
        ? findItem.count++
        : state.items.push({
            ...payload,
            count: 1,
          });
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, { payload }) {
      const findItem = state.items.find((obj) => {
        return obj.id === payload.id && obj.size === payload.size && obj.type === payload.type;
      });

      findItem && findItem.count--;
      findItem && (state.totalPrice -= findItem.price);
    },
    removeItem(state, { payload }) {
      const findItem = state.items.find((obj) => {
        return obj.id === payload.id && obj.size === payload.size && obj.type === payload.type;
      });
      findItem && (state.totalPrice -= findItem.price * findItem.count);
      state.items = state.items.filter((obj) => {
        return obj.id !== payload.id || obj.size !== payload.size || obj.type !== payload.type;
      });
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
