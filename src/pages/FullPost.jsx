import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import ReactMarkdown from 'react-markdown';

import { Post } from '../components/Post';
import { AddComment } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Виникла помилка');
      });

    axios
      .get(`/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? data.imageUrl : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={false}>
        <AddComment postId={id} onCommentAdded={handleCommentAdded} />
      </CommentsBlock>
    </>
  );
};
