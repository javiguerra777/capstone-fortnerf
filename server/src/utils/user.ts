import { User } from '../modules/user';

const users = [];

// joins the user to the specific post
export function joinRoom(id, username, room): User {
  const pUser = { id, username, room };
  users.push(pUser);
  return pUser;
}
// get a particular user id to return the current user
export function getCurrentUser(id): User {
  return users.find((pUser) => pUser.id === id);
}
// called when the user leaves the post and its user object is deleted from the array
export function leaveRoom(id): User | boolean {
  const index = users.findIndex((pUser) => pUser.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return false;
}

export default {};
