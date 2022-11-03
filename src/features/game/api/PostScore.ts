import axios from 'axios';
import dbUrl from '../../../common/api-link/DbLink';

type GameData = {
  id: string;
  user: {
    username: string;
    score: number;
  };
};

const postScore = async (gameData: GameData) => {
  const response = await axios.put(
    `${dbUrl}/room/${gameData.id}`,
    gameData.user,
  );
  return response;
};

export default postScore;
