/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineWechat, AiOutlineAudioMuted } from 'react-icons/ai';
import {
  BsPeople,
  BsFillCameraVideoFill,
  BsCameraVideoOff,
} from 'react-icons/bs';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import GameComponent from '../components/GameComponent';
import GameChat from '../components/GameChat';
import GameWrapper from '../styles/GameStyle';
import { Message } from '../types/AppTypes';

function Game() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [audio, setAudio] = useState(true);
  const [displayVid, setDisplayVid] = useState(true);
  const [displayAside, setDisplayAside] = useState(true);
  const [mystream, setmystream] = useState<any>({});
  const videoRef = useRef<any>();
  const asideOptions = () => {
    if (displayAside) {
      setDisplayAside(false);
    } else {
      setDisplayAside(true);
    }
  };
  const maxWidth = '100%';
  const width = '90%';

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 }, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.autoplay = true;
        videoRef.current.muted = false;
        setmystream(stream);
        console.log(videoRef.current);
      })
      .catch((err) => {
        console.error(err.message);
        setDisplayVid(false);
        setAudio(false);
      });
  }, []);
  function toggleVideo() {
    if (displayVid) {
      setDisplayVid(false);
      mystream.getTracks().forEach((track: any) => {
        if (track.readyState === 'live' && track.kind === 'video') {
          track.enabled = false;
        }
      });
    } else {
      setDisplayVid(true);
      mystream.getTracks().forEach((track: any) => {
        if (track.readyState === 'live' && track.kind === 'video') {
          track.enabled = true;
        }
      });
    }
  }
  function toggleAudio() {
    if (audio) {
      setAudio(false);
      mystream.getTracks().forEach((track: any) => {
        if (track.readyState === 'live' && track.kind === 'audio') {
          track.enabled = false;
        }
      });
    } else {
      setAudio(true);
      mystream.getTracks().forEach((track: any) => {
        if (track.readyState === 'live' && track.kind === 'audio') {
          track.enabled = true;
        }
      });
    }
  }
  const navToDashboard = () => {
    navigate('/dashboard');
  };
  return (
    <GameWrapper>
      <div className="game-chat-container">
        <GameComponent width={displayAside ? width : maxWidth} />
        {displayAside && (
          <GameChat
            asideOptions={asideOptions}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </div>
      <footer className="user-settings background-color">
        <section className="flex-row video-voice">
          <video id="videoElement" ref={videoRef} />
          <p>jhoodie777</p>
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
          <section>
            <button type="button" onClick={navToDashboard}>
              <GiExitDoor />
            </button>
          </section>
        </section>
      </footer>
    </GameWrapper>
  );
}

export default Game;
