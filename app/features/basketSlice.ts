import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type basketItemType = {
  catalogItemId: number;
  catalogItemName: string;
  pictureUri: string;
  count: number;
  price: number;
  totalPrice: number;
};

interface basketStateType {
  items: basketItemType[];
  totalPrice: number;
}

const initialState: basketStateType = {
  items: [],
  totalPrice: 0,
};
const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },

    addToBasket: (state, action: PayloadAction<basketItemType>) => {
      const exists = state.items.find(
        (item) => item.catalogItemId === action.payload.catalogItemId
      )
        ? true
        : false;
      if (!exists) {
        state.items.push({
          ...action.payload,
        });
      } else {
        const newArr = state.items.map((item) => {
          if (item.catalogItemId === action.payload.catalogItemId) {
            const newCount = item.count + action.payload.count;
            return { ...item, count: newCount };
          }
          return item;
        });
        state.items = newArr;
      }
    },
    addAllToBasket: (state, action: PayloadAction<basketItemType[]>) => {
      state.items = action.payload;
    },
    resetBasket: (state) => {
      state.items = [];
    },
    deleteFromBasket: (state, action: PayloadAction<number>) => {
      const newArr = state.items.filter(
        (item) => item.catalogItemId !== action.payload
      );
      state.items = newArr;
    },
    increaseBasketCount: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(
        (item) => item.catalogItemId === action.payload
      );
      state.items[index].count += 1;
    },
    decreaseBasketCount: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(
        (item) => item.catalogItemId === action.payload
      );
      state.items[index].count -= 1;
    },
  },
});

export const {
  addToBasket,
  deleteFromBasket,
  addAllToBasket,
  resetBasket,
  increaseBasketCount,
  decreaseBasketCount,
  setTotalPrice,
} = basketSlice.actions;
export default basketSlice.reducer;
