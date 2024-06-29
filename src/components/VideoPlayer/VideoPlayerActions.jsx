import styles from './styles.module.css';
import { Heart } from '../Icons/Heart';
import { Comments } from '../Icons/Comments';
import { Shares } from '../Icons/Shares';
import { Follow } from '../Icons/Follow';

export default function VideoPlayerActions({
  likes,
  comments,
  shares,
  avatar,
  username,
  hearted = false,
}) {
  return (
    <aside className={styles.actions}>
      <div className={styles.avatar}>
        <img className={styles.avatarImg} alt={username} src={avatar} />
        <div className={styles.follow}>
          <Follow />
        </div>
      </div>

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
