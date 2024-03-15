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
        <div className="post-item" key={post.id} onClick={() => onSelectPost(post.id)}>
          <h2>{post.title}</h2>
          <p className="show-more"> {post.body.substring(0, 100)}...</p>
          <div className="info">
            <p className="author"> Author: {getAuthorName(post.userId)}</p>
            <p className="comments-count">Comments {getCommentsCount(post.id)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
