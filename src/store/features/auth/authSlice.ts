import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'interface';

// Define a type for the slice state
interface AuthState {
  user: null | IUser;
  authenticated: boolean;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.authenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    register: (state, action: PayloadAction<IUser>) => {
      state.authenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.authenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
