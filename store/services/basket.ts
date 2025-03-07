import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    getBasket: builder.query<Product[], void>({
      query: () => `basket`,
      providesTags: ["Basket"],
    }),
    postBasket: builder.mutation<Product[], Product[]>({
      query: (data) => ({
        url: "basket",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Basket"],
    }),
    addToBasket: builder.mutation<Product[], Product>({
      query: (product) => ({
        url: "basket/add",
        method: "POST",
        body: { ...product, quantity: 1 }, // Default quantity to 1
      }),
      invalidatesTags: ["Basket"],
    }),
    removeFromBasket: builder.mutation<Product[], Product["productId"]>({
      query: (productId) => ({
        url: `basket/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
});

export const {
  usePostBasketMutation,
  useGetBasketQuery,
  useAddToBasketMutation,
  useRemoveFromBasketMutation,
} = basketApi;