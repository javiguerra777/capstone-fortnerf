import MalePlayer from '../img/player-img/male_player.png';
import NPC from '../img/player-img/npc.png';
import Pumpkin from '../img/player-img/pumpkin.png';
import Robeman from '../img/player-img/robeman.png';
import Soldier from '../img/player-img/soldier.png';

type UserPayload = {
  username: string;
  email: string;
  name: string;
  sprite: string;
  id: string;
  loggedIn: boolean;
};
const convertToDate = (number: number, first: boolean) => {
  const date: Date = new Date(number);
  const dateToString: string = date.toLocaleString('en-us');
  const dateSplit = dateToString.split(',');
  // returns the date ex: 09/07/2022
  if (first) {
    return dateSplit[0];
  }
  // gets the time ex: 10:59
  const time = dateSplit[1].slice(0, -6);
  // gets the am or pm of the time
  const amOrPm = dateSplit[1].slice(-2);
  // returns the exact time ex: 1:01 pm
  return `${time} ${amOrPm}`;
};
export const switchSpriteSheet = (sprite: string) => {
  switch (sprite) {
    case 'player':
      return MalePlayer;
    case 'pumpkin':
      return Pumpkin;
    case 'soldier':
      return Soldier;
    case 'robeman':
      return Robeman;
    case 'npc':
      return NPC;
    default:
      return MalePlayer;
  }
};
export const updateLocalStorage = async (payload: UserPayload) => {
  await localStorage.setItem('username', payload.username);
  await localStorage.setItem('email', payload.email);
  await localStorage.setItem('name', payload.name);
  await localStorage.setItem('sprite', payload.sprite);
  await localStorage.setItem('id', payload.id);
  await localStorage.setItem('loggedIn', 'true');
};
export const deleteLocalStorage = async () => {
  await localStorage.removeItem('username');
  await localStorage.removeItem('email');
  await localStorage.removeItem('name');
  await localStorage.removeItem('sprite');
  await localStorage.removeItem('id');
  await localStorage.removeItem('loggedIn');
};
export default convertToDate;
