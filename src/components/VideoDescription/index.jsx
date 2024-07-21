import AlbumDisk from './AlbumDisk';
import styles from './styles.module.css';

export default function VideoDescription({ videoInfo }) {
  return (
    <div className={styles.descriptionCard}>
      <div>
        <strong>
          <a
            className={styles.author}
            href={`/user/${videoInfo.users.username}`}
          >
            {' '}
            @{videoInfo.users.username}
          </a>
        </strong>
        <p className={styles.text}>{videoInfo.description}</p>
      </div>
      {videoInfo.songs ? (
        <div className={styles.songInfo}>
          <div className={styles.song}>
            <div className={styles.musicIcon}></div>
            <div className={styles.container}>
              <p className={styles.songTitle1}>
                {videoInfo.songs.title} &nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <p className={styles.songTitle2}>
                {videoInfo.songs.title} &nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            </div>
          </div>
          <div className={styles.album}>
            <AlbumDisk albumCover={videoInfo.songs.cover} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
