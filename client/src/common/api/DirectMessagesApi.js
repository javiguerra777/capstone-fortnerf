import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../environment/BaseUrl';

const DirectMessagesApi = createApi({
  reducerPath: 'api/DirectMessagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Set the 'content-type' header
      headers.set('content-type', 'application/json');
      // Set the 'Authorization' header
      headers.set('Authorization', `Bearer ${getState().user.token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDirectMessages: builder.query({
      query: () => '/api/direct-messages',
      transformResponse: (response) => response.data,
    }),
    getDirectMessagesByRoomId: builder.query({
      query: (roomId) => `/api/direct-messages/${roomId}`,
      transformResponse: (response) => response.data,
    }),
    sendDirectMessage: builder.mutation({
      query: ({ message, roomId = null, recipients }) => ({
        url: '/api/direct-messages',
        method: 'POST',
        body: { message, roomId, recipients },
      }),
      transformResponse: (response) => response.data,
      onQueryStarted: async (
        { roomId },
        { dispatch, queryFulfilled },
      ) => {
        let patchResultRoomMessages;
        let patchResultDirectMessages;
        try {
          const result = await queryFulfilled;
          patchResultRoomMessages = dispatch(
            DirectMessagesApi.util.updateQueryData(
              'getDirectMessagesByRoomId',
              roomId,
              (draft) => {
                draft.messages.push(result.data);
              },
            ),
          );
          patchResultDirectMessages = dispatch(
            DirectMessagesApi.util.updateQueryData(
              'getDirectMessages',
              '',
              (draft) => {
                draft[roomId].messages.unshift(result.data);
              },
            ),
          );
        } catch {
          if (patchResultRoomMessages) {
            patchResultRoomMessages.undo();
          }
          if (patchResultDirectMessages) {
            patchResultDirectMessages.undo();
          }
        }
      },
    }),
  }),
});

export const {
  useGetDirectMessagesQuery,
  useGetDirectMessagesByRoomIdQuery,
  useSendDirectMessageMutation,
} = DirectMessagesApi;
export default DirectMessagesApi;
