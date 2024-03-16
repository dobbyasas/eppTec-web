import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostDetail.scss';

function PostDetail({ postId, onBack, show }) {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  
  const detailClass = show ? 'post-detail enter' : 'post-detail exit';

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the post
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        setPost(postResponse.data);

        // Fetch the author of the post
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${postResponse.data.userId}`);
        setAuthor(userResponse.data);

        // Fetch comments associated with the post
        const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }

    fetchData();
  }, [postId]);

  return (
    <div className={detailClass}>
      <div className="post-detail">
        <button className="back-button" onClick={onBack}>Back to main page</button>
        {post && author && (
          <>
            <h1>{post.title}</h1>
            <p className="author-name">{author.name}</p>
            <div className="post-body">{post.body}</div>
            <br />
            <h3>Comments</h3>
            <div className="comments-section">
              {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <h4>{comment.name}</h4>
                  <p className="author-email">{comment.email}</p>
                  <p className="comment-body">{comment.body}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
