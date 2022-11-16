import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GameComponent from '../components/GameComponent';
import GameChat from '../components/GameChat';
import UsersAside from '../components/UsersAside';
import GameFooter from '../components/GameFooter';
import GameWrapper from '../styles/GameWrapper';
import { Message } from '../../../common/models';
import { setId, updateData } from '../../../app/redux/GameSlice';
import { socket } from '../../../common/service/socket';
import { setCoords } from '../../../app/redux/UserSlice';
import getRoomData from '../api/GetRoomData';
import { useAppDispatch } from '../../../app/redux/hooks';
import UseLeaveGame from '../hooks/UseLeaveGame';
import GetReduxStore from '../../../common/hooks/GetStore';

function Game() {
  const maxWidth = '100%';
  const width = '85%';
  const dispatch = useAppDispatch();
  const {
    user: { username, playerSprite },
    game: { data: roomData },
  } = GetReduxStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayAside, setDisplayAside] = useState(true);
  const [displayAllUsers, setDisplayAllUsers] = useState(false);
  const [message, setMessage] = useState('');
  const closeTab = () => {
    navigate('/dashboard');
  };
  const toggleAside = () => {
    if (displayAside) {
      setDisplayAside(false);
    } else {
      setDisplayAside(true);
      setDisplayAllUsers(false);
    }
  };
  const toggleDisplayUsers = () => {
    if (displayAside && !displayAllUsers) {
      setDisplayAside(false);
      setDisplayAllUsers(true);
    } else if (!displayAside && displayAllUsers) {
      setDisplayAllUsers(false);
    } else if (!displayAside && !displayAllUsers) {
      setDisplayAllUsers(true);
    }
  };
  // useEffects
  UseLeaveGame();
  // checks if room exists, if it doesn't then user gets booted
  useEffect(() => {
    const resolveRoom = async () => {
      try {
        const { data } = await getRoomData(id || '');
        dispatch(updateData(data));
      } catch (err) {
        if (err instanceof Error) {
          setMessage(err.message);
          navigate('/dashboard');
        }
      }
    };
    resolveRoom();
  }, [id, navigate]);
  useEffect(() => {
    socket.emit('join_room', {
      room: id,
      username,
      sprite: playerSprite,
    });
    return () => {
      socket.emit('leave_room', {
        id,
        username,
      });
    };
  }, [id, username, playerSprite]);
  useEffect(() => {
    dispatch(setId(id));
    return () => {
      dispatch(setId(''));
    };
  }, [id, dispatch]);
  useEffect(() => {
    socket.on('chat_msg', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.on('update_coords', (data) => {
      dispatch(setCoords(data));
    });
    socket.on('updatedRoom', (data) => {
      dispatch(updateData(data));
    });
    socket.on('lobby', () => {
      closeTab();
    });
  }, []);
  return (
    <GameWrapper>
      {message && <h1 id="error">Camera {message}</h1>}
      <div className="game-chat-container">
        <GameComponent
          width={displayAside || displayAllUsers ? width : maxWidth}
        />
        {displayAside && (
          <GameChat toggleAside={toggleAside} messages={messages} />
        )}
        {displayAllUsers && (
          <UsersAside
            users={roomData?.users || []}
            privateRoom={roomData?.private || false}
            roomPassword={roomData?.password || ''}
          />
        )}
      </div>
      <GameFooter
        toggleAside={toggleAside}
        toggleDisplayUsers={toggleDisplayUsers}
        users={roomData?.users || []}
        closeTab={closeTab}
      />
    </GameWrapper>
  );
}

export default Game;
