import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostDetail.scss'

function PostDetail({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPostAndComments() {
      const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      setPost(postResponse.data);
      setComments(commentsResponse.data);
    }

    fetchPostAndComments();
  }, [postId]);

  return (
    <div className="post-detail">
      <button className="back-button" onClick={onBack}>Back</button>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <h3>Comments:</h3>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
