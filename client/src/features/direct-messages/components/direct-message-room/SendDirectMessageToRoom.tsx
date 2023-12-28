import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import UseGetUserFromStore from '../../../../common/hooks/UseGetUserFromStore.hook';
import { DirectMessageSchema } from '../../schemas/DirectMessage.schema';
import { DirectMessageUser } from '../../model/DirectMessageUser.model';
import {
  useSendDirectMessageMutation,
  useUpdateDirectMessageMutation,
} from '../../../../common/api/DirectMessagesApi.js';

type Props = {
  activeRoomId: string;
  users: DirectMessageUser[];
  isEditing: boolean;
  editMessageDetails: {
    message: string;
    messageId: string;
  };
  clearEditMessage: () => void;
};

export default function SendDirectMessageToRoom({
  activeRoomId,
  users,
  isEditing,
  editMessageDetails,
  clearEditMessage,
}: Props) {
  console.log(isEditing);
  const { id } = UseGetUserFromStore();
  const [sendDirectMessage] = useSendDirectMessageMutation();
  const [updateDirectMessage] = useUpdateDirectMessageMutation();
  const otherUsers = users
    .filter((user) => user._id !== id)
    .map((user) => user._id);
  const formik = useFormik({
    initialValues: {
      roomDirectMessage: editMessageDetails.message,
      currentRoomId: activeRoomId,
      currentRoomRecipients: otherUsers,
    },
    validateOnMount: true,
    validationSchema: DirectMessageSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          message: values.roomDirectMessage,
          recipients: values.currentRoomRecipients,
          roomId: values.currentRoomId,
        };
        if (isEditing) {
          await updateDirectMessage({
            message: values.roomDirectMessage,
            id: editMessageDetails.messageId,
            roomId: values.currentRoomId,
          }).unwrap();
          clearEditMessage();
          resetForm();
        } else {
          await sendDirectMessage(payload).unwrap();
          resetForm();
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },
  });
  return (
    <div className="h-14 bg-gray-200 px-3 py-1 w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="h-full flex flex-row items-center bg-white rounded-lg border border-gray-400 shadow-lg"
      >
        <button
          type="button"
          className="bg-stone-600 p-2 rounded-full ml-2 hover:bg-stone-400"
        >
          <FaPlus color="white" size={20} />
        </button>
        <input
          type="text"
          id="roomDirectMessage"
          name="roomDirectMessage"
          placeholder="Send Message"
          className="h-full flex-1 ml-2 p-1"
          onChange={formik.handleChange}
          value={formik.values.roomDirectMessage}
        />
        <button
          type="submit"
          className={`h-full w-12 rounded-r-lg flex items-center justify-center ${
            formik.isValid
              ? 'bg-green-400 hover:bg-green-500'
              : 'bg-gray-400'
          }`}
          disabled={!formik.isValid}
        >
          <MdSend size={20} />
        </button>
      </form>
    </div>
  );
}
