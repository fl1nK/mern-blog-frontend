import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { fetchPostsByTag } from '../redux/slices/posts';

export const PostsByTag = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  const { posts, status } = useSelector((state) => state.posts);
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchPostsByTag(tag));
  }, [dispatch, tag]);

  return (
    <Grid container spacing={4}>
      <Grid xs={8} item>
        {posts.items.map((obj, index) =>
          isLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
            />
          ),
        )}
      </Grid>
    </Grid>
  );
};
