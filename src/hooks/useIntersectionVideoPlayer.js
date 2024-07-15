import { useEffect, useState } from 'react';

const options = {
    root: document.querySelector('main'),
    rootMargin: '0px',
    threshold: 0.5,
  };
  
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { target, isIntersecting } = entry;
      target._handleIntersect(isIntersecting);
    });
  }, options);

  export default function useIntersectionVideoPlayer ({video, audio}) {
    const [playing, setPlaying] = useState(false);

  useEffect(() => {
if(!video.current) return

    observer.observe(video.current);
    video.current._handleIntersect = (isIntersecting) => {
      const { current: videoEl } = video;
      const audioEl = audio?.current

      if (isIntersecting)  
        {videoEl.play(); 
            if (audioEl) 
                {audioEl.play();audioEl.volume = 0.2;}
            videoEl.volume = 1
        } 
      else 
        {videoEl.pause(); audioEl?.pause();
}
      setPlaying(!videoEl.paused);
    };
  }, [video.current]);

  const handlePlay = (e) => {
    const { current: videoEl } = video;
    let audioEl
    if (audio) 
        {audioEl= audio.current}

    if (!playing)  
      {videoEl.play(); audioEl?.play()} 
    else 
      {videoEl.pause(); audioEl?.pause();
}
    setPlaying(!playing);
  }

return {playing, handlePlay}}