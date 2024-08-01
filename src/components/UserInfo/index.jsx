import React from 'react';
import styles from './UserInfo.module.scss';
import { format } from 'date-fns';

export const UserInfo = ({ avatarUrl, fullname, additionalText }) => {
  const formattedDate = format(new Date(additionalText), 'dd.MM.yyyy HH:mm:ss');

  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl ? `${process.env.REACT_APP_API_URL}${avatarUrl}` : '/noavatar.png'}
        alt={fullname}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullname}</span>
        <span className={styles.additional}>{formattedDate}</span>
      </div>
    </div>
  );
};
