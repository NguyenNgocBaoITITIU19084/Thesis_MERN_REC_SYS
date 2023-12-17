import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import categoriesReducer from "../features/categories/categoriesSlice";
import brandsReducer from "../features/brands/brandsSlice";
import productsReducer from "../features/products/productsSlice";
import authReducer from "../features/auths/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  brands: brandsReducer,
  products: productsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
