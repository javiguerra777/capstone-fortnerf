export type Message = {
  username: string;
  message: string;
  date: number;
  sprite: string;
};
export interface RoomData {
  users: [];
  private?: boolean;
  password?: string;
}
export default {};
