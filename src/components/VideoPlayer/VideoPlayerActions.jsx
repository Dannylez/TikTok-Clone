import styles from './styles.module.css';
import { Heart } from '../Icons/Heart';
import { Comments } from '../Icons/Comments';
import { Shares } from '../Icons/Shares';
import { Follow } from '../Icons/Follow';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { addLike, getLikes, removeLike } from '../../services';

export default function VideoPlayerActions({
  videoInfo,
  /* likes,
  comments,
  shares,
  avatar,
  username, */
}) {
  const [listOfLikes, setListOfLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(videoInfo.likes);

  useEffect(() => {
    getLikes().then(([error, data]) => {
      if (error) return;
      setListOfLikes(data);
    });
  }, []);

  useEffect(() => {
    const isLiked = listOfLikes.find(
      (item) =>
        item.video_id === videoInfo.id && item.user_id === videoInfo.user_id
    ); /*va a tener que ser el user logeado*/
    if (isLiked) {
      setLiked(true);
    }
  }, [listOfLikes]);

  /* useEffect(() => {if}, [videoInfo.likes]) */
  const handleLikes = (e, videoInfo) => {
    e.stopPropagation();
    if (!liked) {
      addLike(videoInfo.user_id, videoInfo.id, likes);
      setLikes(likes + 1);
      return setLiked(true);
    }
    removeLike(videoInfo.user_id, videoInfo.id, likes);
    setLikes(likes - 1);
    return setLiked(false);
  };

  return (
    <aside className={styles.actions}>
      <div className={styles.avatar}>
        <img
          className={styles.avatarImg}
          alt={videoInfo.users.username}
          src={videoInfo.users.avatar}
        />
        <div className={styles.follow}>
          <Follow />
        </div>
      </div>

      <button
        className={styles.actionButton}
        onClick={(e) => handleLikes(e, videoInfo)}
      >
        <Heart fill={liked ? 'rgb(254, 44, 85)' : 'white'} />
        <span title='likes'>{likes}</span>
      </button>

      <button className={styles.actionButton}>
        <Comments />
        <span title='comments'>{videoInfo.comments}</span>
      </button>
      <Link to='/upload'>
        {' '}
        <button className={styles.actionButton}>
          <Shares />
          <span title='shares'>{videoInfo.shares}</span>
        </button>
      </Link>
    </aside>
  );
}
