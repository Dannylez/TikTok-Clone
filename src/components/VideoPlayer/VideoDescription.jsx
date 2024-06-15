import AlbumDisk from './AlbumDisk';
import styles from './styles.module.css';

export default function VideoDescription({
  author,
  description,
  albumCover,
  songTitle,
}) {
  return (
    <footer className={styles.footer}>
      <div>
        <strong>{author}</strong>
        <p>{description}</p>
        <div className={styles.song}>
          <div className={styles.musicIcon}></div>
          <div className={styles.container}>
            <p className={styles.songTitle1}>{songTitle}</p>
            <p className={styles.songTitle2}>{songTitle}</p>
          </div>
        </div>
      </div>
      <div className={styles.album}>
        <AlbumDisk albumCover={albumCover} />
      </div>
    </footer>
  );
}
