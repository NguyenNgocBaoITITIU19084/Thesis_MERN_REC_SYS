import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "Computer",
    image:
      "https://haloshop.vn/image/cache/catalog/products/apple/macbook/macbook-pro-2020-13-inch-chip-m1-gray-00-700x700.jpg",
  },
  {
    id: "2",
    name: "USB Cable",
    image:
      "https://vinasound.vn/wp-content/uploads/2022/01/Thumbnail-Hosa-SuperSpeed-USB-3-0-Cable-Type-A-to-Type-C.jpg",
  },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
