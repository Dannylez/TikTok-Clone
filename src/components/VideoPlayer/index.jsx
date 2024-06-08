import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

const SRC = 'https://www.pexels.com/video/2499611/';

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const video = useRef();

  const handlePlay = () => {
    playing ? video.current.pause() : video.current.play();

    setPlaying(!playing);
  };

  const playerClassName = clsx(styles.player, {
    [styles.hidden]: !playing,
  });

  return (
    <div>
      <video
        onClick={handlePlay}
        ref={video}
        className={styles.video}
        controls={false}
        src="https://videos.pexels.com/video-files/2499611/2499611-hd_1080_1920_30fps.mp4"
      />
      <i className={playerClassName} />
    </div>
  );
}
