import styles from './styles.module.css';
import { Heart } from '../Icons/Heart';
import { Comments } from '../Icons/Comments';
import { Shares } from '../Icons/Shares';
import { Follow } from '../Icons/Follow';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { addLike, getLikes, removeLike } from '../../services';

export default function VideoPlayerActions({ videoInfo }) {
  const [listOfLikes, setListOfLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(videoInfo.likes);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(window.history.state.user);
    getLikes().then(([error, data]) => {
      if (error) return;
      setListOfLikes(data);
    });
  }, []);

  useEffect(() => {
    const isLiked = listOfLikes.find(
      (item) => item.video_id === videoInfo.id && item.user_id === user.id
    );
    if (isLiked) {
      setLiked(true);
    }
  }, [listOfLikes]);

  const handleLikes = (e, videoInfo) => {
    e.stopPropagation();
    if (!liked) {
      addLike(user.id, videoInfo.id, likes);
      setLikes(likes + 1);
      return setLiked(true);
    }
    removeLike(user.id, videoInfo.id, likes);
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

      <button className={styles.actionButton}>
        <Shares />
        <span title='shares'>{videoInfo.shares}</span>
      </button>
    </aside>
  );
}
