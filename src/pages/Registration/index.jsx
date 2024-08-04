import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Помилка при завантаженні файлу!');
    }
  };

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchRegister({ ...values, avatarUrl: imageUrl }));

      if (!data.payload) {
        alert('Не вдалося зареєструватися!');
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.error(error);
      alert('Помилка при реєстрації');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення акаунта
      </Typography>
      <div className={styles.avatar}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeFile}
          ref={inputFileRef}
          style={{ display: 'none' }}
        />
        <Button onClick={() => inputFileRef.current.click()}>
          <Avatar sx={{ width: 100, height: 100 }} src={imageUrl} />
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullname?.message)}
          helperText={errors.fullname?.message}
          {...register('fullname', { required: "Вкажіть повне ім'я" })}
          className={styles.field}
          label="Повне ім'я"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Вкажіть електронну пошту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Вкажіть пароль' })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зареєструватися
        </Button>
      </form>
    </Paper>
  );
};
