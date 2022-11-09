import React, { LegacyRef } from 'react';
import { AiOutlineWechat, AiOutlineAudioMuted } from 'react-icons/ai';
import {
  BsPeople,
  BsFillCameraVideoFill,
  BsCameraVideoOff,
} from 'react-icons/bs';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import GetReduxStore from '../../../common/functions/GetStore';

type Footer = {
  audio: boolean;
  users: [];
  displayVid: boolean;
  videoRef: LegacyRef<HTMLVideoElement> | undefined;
  toggleAudio: () => void;
  toggleVideo: () => void;
  toggleAside: () => void;
  toggleDisplayUsers: () => void;
  closeTab: () => void;
};
function GameFooter({
  videoRef,
  toggleAudio,
  audio,
  toggleVideo,
  displayVid,
  toggleAside,
  toggleDisplayUsers,
  users,
  closeTab,
}: Footer) {
  const {
    user: { username },
  } = GetReduxStore();
  return (
    <>
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
          <button type="button" onClick={toggleAside}>
            <AiOutlineWechat />
          </button>
          <button type="button" onClick={toggleDisplayUsers}>
            <BsPeople />
            {users?.length}
          </button>
        </section>
        <div>
          <button type="button" onClick={closeTab}>
            <GiExitDoor />
          </button>
        </div>
      </section>
    </>
  );
}

export default GameFooter;
