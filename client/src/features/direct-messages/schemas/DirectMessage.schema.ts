import * as Yup from 'yup';

export const DirectMessageSchema = Yup.object().shape({
  roomDirectMessage: Yup.string().required('Required'),
  currentRoomId: Yup.string().required('Required'),
  currentRoomRecipients: Yup.array().required('Required'),
});
export default {};
