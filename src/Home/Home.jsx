import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';

function Home({ onSelectPost }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(postsResponse.data);
    }

    async function fetchUsers() {
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(usersResponse.data);
    }

    async function fetchComments() {
        const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setComments(commentsResponse.data);
    }

    fetchPosts();
    fetchUsers();
    fetchComments();
  }, []);

  const getAuthorName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown author';
  };

  const getCommentsCount = (postId) => {
    return comments.filter(comments => comments.postId === postId).length;
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
