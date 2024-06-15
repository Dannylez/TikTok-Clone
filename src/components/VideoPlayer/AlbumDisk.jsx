import styles from './styles.module.css';

export default function AlbumDisk({ albumCover }) {
  return (
    <div>
      <img className={styles.albumCover} src={albumCover} />
    </div>
  );
}
