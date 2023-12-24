export type Message = {
  username: string;
  message: string;
  date: number;
};
export interface RoomData {
  users: [];
  private?: boolean;
  password?: string;
}
export default {};
