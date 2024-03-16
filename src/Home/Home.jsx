import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';

function Home({ onSelectPost }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
        
        setPosts(postsResponse.data);
        setUsers(usersResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const getAuthorName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown author';
  };

  const getCommentsCount = (postId) => {
    return comments.filter(comments => comments.postId === postId).length;
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div className="post-item" key={post.id}>
          <h2>{post.title}</h2>
          <div className="author">
            <p>{getAuthorName(post.userId)}</p>
          </div>
          <p className="post-excerpt">{post.body.substring(0, 100)}...</p>
          <div className="info">
            <button className="show-more" onClick={() => onSelectPost(post.id)}>Show more...</button>
            <span className="comments-count">Comments: {getCommentsCount(post.id)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
