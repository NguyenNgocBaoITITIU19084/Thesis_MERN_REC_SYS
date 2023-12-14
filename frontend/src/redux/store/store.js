import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "../features/categories/categoriesSlice";
import brandsReducer from "../features/brands/brandsSlice";
import productsReducer from "../features/products/productsSlice";

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    brands: brandsReducer,
    products: productsReducer,
  },
});
