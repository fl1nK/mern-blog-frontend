import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../axios';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import styles from './AddComment.module.scss';

export const AddComment = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState('');

  const { data } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/comments', { text, postId });
      onCommentAdded(data);
      setText('');
    } catch (err) {
      console.error(err);
      alert('Щоб додати коментар, ви повині авторизуватися!');
    }
  };

  return (
    <div className={styles.root}>
      <Avatar classes={{ root: styles.avatar }} src={data?.avatarUrl} />
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Написати коментар"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Відправити
          </Button>
        </form>
      </div>
    </div>
  );
};
