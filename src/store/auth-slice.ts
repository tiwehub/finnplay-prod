import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  username: null,
};

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
if (token) {
  initialState.isAuthenticated = true;
  initialState.token = token;
  initialState.username = username;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; username: string }>,
    ) {
      console.log('setCredentials called with token:', action.payload.token);
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },
    logout(state) {
      console.log('logout called');
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      console.log('Local storage and cookies cleared');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
