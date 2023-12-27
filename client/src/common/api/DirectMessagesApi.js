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
      headers.set('content-type', 'application/json');
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
    updateDirectMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `/api/direct-messages/message/${id}`,
        method: 'PUT',
        body: { message },
      }),
      transformResponse: (response) => response.data,
    }),
    deleteDirectMessage: builder.mutation({
      query: ({ id }) => ({
        url: `/api/direct-messages/message/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
      onQueryStarted: async (
        { id, roomId },
        { dispatch, queryFulfilled },
      ) => {
        let patchResultRoomMessages;
        let patchDirectMessages;
        try {
          await queryFulfilled;
          patchResultRoomMessages = dispatch(
            DirectMessagesApi.util.updateQueryData(
              'getDirectMessagesByRoomId',
              roomId,
              (draft) => {
                draft.messages = draft.messages.filter(
                  (message) => message._id !== id,
                );
              },
            ),
          );
          patchDirectMessages = dispatch(
            DirectMessagesApi.util.updateQueryData(
              'getDirectMessages',
              '',
              (draft) => {
                draft[roomId].messages = draft[
                  roomId
                ].messages.filter((message) => message._id !== id);
              },
            ),
          );
        } catch {
          if (patchResultRoomMessages) {
            patchResultRoomMessages.undo();
          }
          if (patchDirectMessages) {
            patchDirectMessages.undo();
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
  useUpdateDirectMessageMutation,
  useDeleteDirectMessageMutation,
} = DirectMessagesApi;
export default DirectMessagesApi;
