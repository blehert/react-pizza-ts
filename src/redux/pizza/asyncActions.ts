import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza } from './types';

// тут я указываю получает params это Объект в котором ключи и значения это строки
export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',

  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62a8c8baec36bf40bdadf2ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);
