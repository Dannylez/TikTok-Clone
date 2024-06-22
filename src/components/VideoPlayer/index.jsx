import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import VideoPlayerActions from './VideoPlayerActions';
import VideoDescription from '../VideoDescription';

const SRC =
  'https://videos.pexels.com/video-files/2499611/2499611-hd_1080_1920_30fps.mp4';

export default function VideoPlayer({
  src,
  author,
  albumCover,
  description,
  songTitle,
}) {
  const [playing, setPlaying] = useState(false);
  const video = useRef(null);

  /* useEffect(() => {
    console.log(video);

    fetch(video.current.src);
    video.current.load();
  }, [video]);
 */
  const handlePlay = () => {
    const { current: videoEl } = video;
    /*     let playPromise = videoEl.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          videoEl.pause();
        })
        .catch((error) => {
          console.error(error);
        });
    } */

    playing ? videoEl.pause() : videoEl.play();

    setPlaying(!playing);
  };

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
        src={src}
      />
      <i className={playerClassName} />
      <VideoPlayerActions />
      <VideoDescription
        albumCover={albumCover}
        author={author}
        description={description}
        songTitle={songTitle}
      />
    </div>
  );
}
