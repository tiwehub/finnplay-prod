import { configureStore } from '@reduxjs/toolkit';

import { api } from '@/lib/api-client';

import authReducer from './auth-slice.ts';
import notificationsReducer from './notifications-slice.ts';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    notifications: notificationsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
