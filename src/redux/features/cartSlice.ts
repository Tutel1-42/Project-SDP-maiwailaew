import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArtToyType } from "../../../interfaces";

export type CartItem = ArtToyType & {
    orderAmount: number;
}

type CartState = {
    toyItems: CartItem[]
}

const initialState:CartState = { toyItems:[]}

export const cartSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: {
        addOrder: (state, action:PayloadAction<CartItem>)=> {
            state.toyItems.push(action.payload)
        },
        removeOrder: (state, action:PayloadAction<CartItem>)=> {
            const remainItems = state.toyItems.filter( obj => {
                return obj._id !== action.payload._id;
            })
            state.toyItems = remainItems
        },
        clearCart: (state) => {
            state.toyItems = [];
        }
    }
})

export const { addOrder, removeOrder, clearCart} = cartSlice.actions
export default cartSlice.reducer