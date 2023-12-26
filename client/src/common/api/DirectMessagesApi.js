import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../environment/BaseUrl';

const baseQueryWithAuth = async ({ getState, ...request }) => {
  const { token } = getState().user;
  const result = await fetchBaseQuery({
    ...request,
    baseUrl,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};

const DirectMessagesApi = createApi({
  reducerPath: 'api/DirectMessagesApi',
  baseQuery: baseQueryWithAuth,
  endPoints: (builder) => ({
    getDirectMessages: builder.query({
      query: () => '/api/direct-messages',
    }),
  }),
});

export default DirectMessagesApi;
