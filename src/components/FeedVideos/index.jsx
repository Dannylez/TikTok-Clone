import VideoPlayer from '../VideoPlayer';
import styles from './styles.module.css';

const VIDEOS = [
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
    src: 'https://videos.pexels.com/video-files/2499611/2499611-hd_1080_1920_30fps.mp4',
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
];

export default function FeedVideos() {
  return VIDEOS.map((video) => {
    return (
      <div key={video.id} className={styles.item}>
        <VideoPlayer {...video} />
      </div>
    );
  });
}
