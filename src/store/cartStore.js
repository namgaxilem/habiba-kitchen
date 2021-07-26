import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const { product, quantity } = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === product.id) {
                    state[i].quantity += quantity;
                    axios({
                        method: "POST",
                        withCredentials: true,
                        mode: 'no-cors',
                        url: `http://localhost:8069/frontend/update_cart_json?product_id=${product.id}&set_qty=${quantity}`,
                        data: {},
                        headers: {
                            'Content-Type': 'multipart/form-data;text/plain;charset=utf-8',
                        },
                    }).then(value => console.log('value', value), error => console.log(error))
                    return;
                }
            }
            const temp = { ...product };
            temp.quantity = Number(quantity);
            state.push(temp);
            axios({
                method: "POST",
                withCredentials: true,
                mode: 'no-cors',
                url: `http://localhost:8069/frontend/update_cart_json?product_id=${product.id}&set_qty=${quantity}`,
                data: {},
                headers: {
                    'Content-Type': 'multipart/form-data;text/plain;charset=utf-8',
                },
            }).then(
                value => console.log('value', value),
                error => console.log(error)
            )
        },
        updateCart(state, action) {
            const { id, quantity } = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === id && quantity !== 0) {
                    state[i].quantity = Number(quantity);
                    axios({
                        method: "POST",
                        withCredentials: true,
                        mode: 'no-cors',
                        url: `http://localhost:8069/frontend/update_cart_json?product_id=${id}&set_qty=${quantity}`,
                        data: {},
                        headers: {
                            'Content-Type': 'multipart/form-data;text/plain;charset=utf-8',
                        },
                    }).then(
                        value => console.log('value', value),
                        error => console.log(error)
                    )
                    return;
                } else if (state[i].id === id && quantity === 0) {
                    state.splice(i, 1);
                    axios({
                        method: "POST",
                        withCredentials: true,
                        mode: 'no-cors',
                        url: `http://localhost:8069/frontend/update_cart_json?product_id=${id}&set_qty=${quantity}`,
                        data: {},
                        headers: {
                            'Content-Type': 'multipart/form-data;text/plain;charset=utf-8',
                        },
                    }).then(
                        value => console.log('value', value),
                        error => console.log(error)
                    )
                }
            }
        },
        clearCart(state) {
            state.length = 0;
        },
        removeCartItem(state, action) {
            const id = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === id) {
                    state.splice(i, 1);
                    return;
                }
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, clearCart, removeCartItem } = cartSlice.actions

export default cartSlice.reducer