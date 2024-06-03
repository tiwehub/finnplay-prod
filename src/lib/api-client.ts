import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/config/env';
import { addNotification } from '@/store/notifications-slice.ts';
import { RootState } from '@/store/store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    getGames: builder.query<any, void>({
      query: () => 'games',
    }),
  }),
});

api.enhanceEndpoints({
  addTagTypes: [],
  endpoints: {
    login: {
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          const message = error.response?.data?.message || error.message;
          dispatch(
            addNotification({
              type: 'error',
              title: 'Error',
              message,
            }),
          );
        }
      },
    },
    getGames: {
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          const message = error.response?.data?.message || error.message;
          dispatch(
            addNotification({
              type: 'error',
              title: 'Error',
              message,
            }),
          );
        }
      },
    },
    logout: {
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          const message = error.response?.data?.message || error.message;
          dispatch(
            addNotification({
              type: 'error',
              title: 'Error',
              message,
            }),
          );
        }
      },
    },
  },
});

export const { useLoginMutation, useLogoutMutation, useGetGamesQuery } = api;
