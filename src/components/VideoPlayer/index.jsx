import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import VideoPlayerActions from './VideoPlayerActions';
import VideoDescription from '../VideoDescription';
import useIntersectionVideoPlayer from '../../hooks/useIntersectionVideoPlayer';

export default function VideoPlayer({
  videoInfo,
  /* src,
  users,
  songs,
  description,
  likes,
  comments,
  shares, */
}) {
  const video = useRef(null);
  const { playing, handlePlay } = useIntersectionVideoPlayer({ video });

  const playerClassName = clsx(styles.player, {
    [styles.hidden]: playing,
  });

  return (
    <div className={styles.wrapper} onClick={handlePlay}>
      <video
        ref={video}
        className={styles.video}
        loop
        controls={false}
        src={videoInfo.src}
      />
      <i className={playerClassName} />
      <VideoPlayerActions
        videoInfo={videoInfo}
        /* likes={videoInfo.likes}
        comments={comments}
        shares={shares}
        avatar={users.avatar}
        username={users.username} */
      />
      <VideoDescription
        albumCover={videoInfo.songs.cover}
        author={videoInfo.users.username}
        description={videoInfo.description}
        songTitle={videoInfo.songs.title}
      />
    </div>
  );
}
