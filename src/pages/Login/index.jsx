import { useEffect, useState } from 'react';
import { getUsers } from '../../services';
import styles from './styles.module.css';
import { useLocation } from 'wouter';

export default function Login() {
  const [users, setUsers] = useState([]);
  const [location, navigate] = useLocation();

  useEffect(() => {
    getUsers().then(([error, users]) => {
      if (error) return setError(error);
      setUsers(users);
    });
  }, []);

  const handleClick = (user) => {
    navigate('/feed', { state: { user } });
  };

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>Choose your user</h1>
      <ul className={styles.container}>
        {users.map((user) => {
          return (
            <li
              key={user.id}
              className={styles.liUser}
              onClick={() => {
                handleClick(user);
              }}
            >
              <img src={user.avatar} className={styles.avatar} />
              {user.username}
            </li>
          );
        })}
      </ul>
      <p className={styles.text}>
        This is just a demonstration of the app, users are generic and don't
        provide any information
      </p>
    </div>
  );
}
