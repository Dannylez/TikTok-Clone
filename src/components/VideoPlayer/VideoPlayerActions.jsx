import styles from './styles.module.css';
import { Heart } from '../Icons/Heart';
import { Comments } from '../Icons/Comments';
import { Shares } from '../Icons/Shares';

export default function VideoPlayerActions({
  likes = 12,
  comments = 23,
  shares = 2,
  hearted = false,
}) {
  return (
    <aside className={styles.actions}>
      <button className={styles.actionButton}>
        <Heart />
        <span title='likes'>{likes}</span>
      </button>
      <button className={styles.actionButton}>
        <Comments />
        <span title='comments'>{comments}</span>
      </button>
      <button className={styles.actionButton}>
        <Shares />
        <span title='shares'>{shares}</span>
      </button>
    </aside>
  );
}
