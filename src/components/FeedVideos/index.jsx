import VideoPlayer from '../VideoPlayer';
import styles from './styles.module.css';
import { getVideos } from '../../services';
import { useEffect, useState } from 'react';

/* const VIDEOS = [
  {
    id: 1,
    author: 'ruziotaku',
    description: 'un video cualquiera',
    likes: 123,
    shares: 234,
    comments: 1,
    songTitle: 'At the risk of feeling dumb',
    albumCover:
      'https://www.lahiguera.net/musicalia/artistas/twenty_one_pilots/disco/13381/twenty_one_pilots_clancy-portada.jpg',
    src: 'https://videos.pexels.com/video-files/20714562/20714562-hd_1080_1920_60fps.mp4',
  },
  {
    id: 2,
    author: 'ruziotaku',
    description: 'otro video cualquiera',
    likes: 234,
    shares: 14,
    comments: 4,
    songTitle: 'At the risk of feeling dumb',
    albumCover:
      'https://www.lahiguera.net/musicalia/artistas/twenty_one_pilots/disco/13381/twenty_one_pilots_clancy-portada.jpg',
    src: 'https://videos.pexels.com/video-files/19190552/19190552-hd_1080_1920_30fps.mp4',
  },
]; */

export default function FeedVideos() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVideos().then(([error, videos]) => {
      if (error) return setError(error);
      setVideos(videos);
    });
  }, []);

  if (error) return <span>{error}</span>;

  return videos.map((video) => {
    return (
      <div key={video.id} className={styles.item}>
        <VideoPlayer {...video} />
      </div>
    );
  });
}
