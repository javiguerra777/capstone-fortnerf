import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { toast } from 'react-toastify';
import GameComponent from '../components/GameComponent';
import GameChat from '../components/GameChat';
import UsersAside from '../components/UsersAside';
import GameFooter from '../components/GameFooter';
import { GameWrapper } from '../styles/Game.style';
import { Message, RoomData } from '../../../common/models/AppTypes';
import { RootState } from '../../../store';
import { socket } from '../../../common/service/socket';
import { setCoords } from '../../../store/UserSlice';
import { getRoomData } from '../../../common/service/Game.service';

function Game() {
  const maxWidth = '100%';
  const width = '85%';
  const dispatch = useDispatch();
  const { username } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [audio, setAudio] = useState(true);
  const [displayVid, setDisplayVid] = useState(true);
  const [displayAside, setDisplayAside] = useState(true);
  const [displayAllUsers, setDisplayAllUsers] = useState(false);
  const [myStream, setMyStream] = useState<MediaStream>();
  const [roomData, setRoomData] = useState<RoomData>();
  const videoRef = useRef<HTMLVideoElement>(null);
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
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 }, audio: true })
      .then((stream) => {
        setMyStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.autoplay = true;
          videoRef.current.muted = true;
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setDisplayVid(false);
        setAudio(false);
      });
  }, []);
  // checks if room exists, if it doesn't then user gets booted
  useEffect(() => {
    const resolveRoom = async () => {
      try {
        const { data } = await getRoomData(id || '');
        setRoomData(data);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
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
    });
    return () => {
      socket.emit('leave_room', {
        id,
        username,
      });
    };
  }, [id, username]);
  useEffect(() => {
    socket.on('chat_msg', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.on('update_coords', (data) => {
      dispatch(setCoords(data));
    });
    socket.on('updatedRoom', (data) => {
      setRoomData(data);
    });
    socket.on('lobby', () => {
      navigate('/dashboard');
    });
  }, []);
  // functions
  const toggleVideo = () => {
    if (displayVid) {
      setDisplayVid(!displayVid);
      myStream?.getTracks().forEach((track: MediaStreamTrack) => {
        track.enabled = !(
          track.readyState === 'live' && track.kind === 'video'
        );
      });
    } else {
      setDisplayVid(true);
      myStream?.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.readyState === 'live' && track.kind === 'video') {
          track.enabled = true;
        }
      });
    }
  };
  const toggleAudio = () => {
    if (audio) {
      setAudio(false);
      myStream?.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.readyState === 'live' && track.kind === 'audio') {
          track.enabled = false;
        }
      });
    } else {
      setAudio(true);
      myStream?.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.readyState === 'live' && track.kind === 'audio') {
          track.enabled = true;
        }
      });
    }
  };
  const navToDashboard = () => {
    navigate('/dashboard');
  };
  return (
    <GameWrapper>
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
            username={username}
            privateRoom={roomData?.private || false}
            roomPassword={roomData?.password || ''}
          />
        )}
      </div>
      <footer className="user-settings background-color">
        <GameFooter
          videoRef={videoRef}
          username={username}
          toggleAudio={toggleAudio}
          audio={audio}
          toggleVideo={toggleVideo}
          displayVid={displayVid}
          toggleAside={toggleAside}
          toggleDisplayUsers={toggleDisplayUsers}
          users={roomData?.users || []}
          navToDashboard={navToDashboard}
        />
      </footer>
    </GameWrapper>
  );
}

export default Game;
