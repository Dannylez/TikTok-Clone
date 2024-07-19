import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import VideoPlayerActions from './VideoPlayerActions';
import VideoDescription from '../VideoDescription';
import useIntersectionVideoPlayer from '../../hooks/useIntersectionVideoPlayer';

export default function VideoPlayer({ videoInfo }) {
  const video = useRef(null);
  const audio = useRef(null);
  const { playing, handlePlay } = useIntersectionVideoPlayer({ video, audio });

  const playerClassName = clsx(styles.player, {
    [styles.hidden]: playing,
  });

  const handleEnded = () => {
    const videoEl = video.current;
    const audioEl = audio?.current;
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.play();
    }
    videoEl.currentTime = 0;
    videoEl.play();
  };

  return (
    <div className={styles.wrapper} onClick={handlePlay}>
      <video
        ref={video}
        className={styles.video}
        controls={false}
        src={videoInfo.src}
        onEnded={() => handleEnded()}
      />
      <audio ref={audio} src={videoInfo.songs.src}></audio>
      <i className={playerClassName} />
      <VideoPlayerActions videoInfo={videoInfo} />
      <VideoDescription
        albumCover={videoInfo.songs.cover}
        author={videoInfo.users.username}
        description={videoInfo.description}
        songTitle={videoInfo.songs.title}
      />
    </div>
  );
}
