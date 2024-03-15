import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      {posts.map((post) => (
        <div key={post.id} onClick={() => onSelectPost(post.id)}>
          <h2>{post.title}</h2>
          <p>{post.body.substring(0, 100)}...</p>
          <p>Author: {getAuthorName(post.userId)}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
