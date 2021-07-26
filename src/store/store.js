import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartStore';
import userReducer from './userStore';

export default configureStore({
  reducer: {
    cartItems: cartReducer,
    user: userReducer
  }
})