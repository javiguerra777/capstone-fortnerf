import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineWechat, AiOutlineAudioMuted } from 'react-icons/ai';
import {
  BsPeople,
  BsFillCameraVideoFill,
  BsCameraVideoOff,
} from 'react-icons/bs';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import GameComponent from '../components/GameComponent';
import GameChat from '../components/GameChat';
import GameWrapper from '../styles/GameStyle';
import { Message } from '../types/AppTypes';
import { RootState } from '../store';
import { setId } from '../store/GameSlice';
import { socket } from '../service/socket';
import { setCoords } from '../store/UserSlice';
import { getRoomData } from '../utils/api';

function Game() {
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [host, setHost] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [audio, setAudio] = useState(true);
  const [displayVid, setDisplayVid] = useState(true);
  const [displayAside, setDisplayAside] = useState(true);
  const [message, setMessage] = useState('');
  const [mystream, setmystream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const asideOptions = () => {
    if (displayAside) {
      setDisplayAside(false);
    } else {
      setDisplayAside(true);
    }
  };
  const maxWidth = '100%';
  const width = '90%';
  // useEffects
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 }, audio: true })
      .then((stream) => {
        setmystream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.autoplay = true;
          videoRef.current.muted = true;
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setDisplayVid(false);
        setAudio(false);
      });
  }, []);
  useEffect(() => {
    const resolveRoom = async () => {
      try {
        getRoomData(id || '').then((res) => {
          if (res.data.host === username) {
            console.log('host');
            setHost(true);
          }
        });
      } catch (err) {
        if (err instanceof Error) {
          setMessage(err.message);
          navigate('/dashboard');
        }
      }
    };
    resolveRoom();
  }, []);
  useEffect(() => {
    socket.emit('join_room', {
      room: id,
      username,
    });
    return () => {
      console.log(host);
      socket.emit('leave_room', {
        id,
        host,
      });
    };
  }, [id, username]);
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
    socket.on('first_player', (data) => {
      dispatch(setCoords(data));
    });
    socket.on('second_player', (data) => {
      dispatch(setCoords(data));
    });
    socket.on('lobby', () => {
      navigate('/dashboard');
    });
  }, []);
  // functions
  function toggleVideo() {
    if (displayVid) {
      setDisplayVid(!displayVid);
      mystream?.getTracks().forEach((track: MediaStreamTrack) => {
        track.enabled = !(
          track.readyState === 'live' && track.kind === 'video'
        );
      });
    } else {
      setDisplayVid(true);
      mystream?.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.readyState === 'live' && track.kind === 'video') {
          track.enabled = true;
        }
      });
    }
  }
  function toggleAudio() {
    if (audio) {
      setAudio(false);
      mystream?.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.readyState === 'live' && track.kind === 'audio') {
          track.enabled = false;
        }
      });
    } else {
      setAudio(true);
      mystream?.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.readyState === 'live' && track.kind === 'audio') {
          track.enabled = true;
        }
      });
    }
  }
  const navToDashboard = () => {
    navigate('/dashboard');
  };
  if (message) {
    setTimeout(() => {
      setMessage('');
    }, 1000);
  }
  return (
    <GameWrapper>
      {message && <h1 id="error">Camera {message}</h1>}
      <div className="game-chat-container">
        <GameComponent width={displayAside ? width : maxWidth} />
        {displayAside && (
          <GameChat asideOptions={asideOptions} messages={messages} />
        )}
      </div>
      <footer className="user-settings background-color">
        <section className="flex-row video-voice">
          <video id="videoElement" muted ref={videoRef} />
          <p>{username}</p>
          <button type="button" onClick={toggleAudio}>
            {audio ? (
              <FaMicrophoneAlt />
            ) : (
              <AiOutlineAudioMuted color="red" />
            )}
          </button>
          <button type="button" onClick={toggleVideo}>
            {displayVid ? (
              <BsFillCameraVideoFill />
            ) : (
              <BsCameraVideoOff color="red" />
            )}
          </button>
        </section>
        <section className="flex-row text-users">
          <section>
            <button type="button" onClick={asideOptions}>
              <AiOutlineWechat />
            </button>
            <button type="button">
              <BsPeople />
              10
            </button>
          </section>
          <div>
            <button type="button" onClick={navToDashboard}>
              <GiExitDoor />
            </button>
          </div>
        </section>
      </footer>
    </GameWrapper>
  );
}

export default Game;
