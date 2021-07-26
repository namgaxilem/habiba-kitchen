import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        updateUser(state, action) {
            console.log('updateUser', action.payload);
            state.push(action.payload);
        },
        clearUser(state) {
            state.length = 0;
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateUser, clearUser } = userSlice.actions

export default userSlice.reducer