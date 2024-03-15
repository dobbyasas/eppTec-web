import './App.scss';
import React, { useState } from 'react';
import Home from './Home/Home';
import PostDetail from './PostDetail/PostDetail'

function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);

  return (
    <div className="app-container">
      {selectedPostId ? (
        <PostDetail postId={selectedPostId} onBack={() => setSelectedPostId(null)} />
      ) : (
        <Home onSelectPost={setSelectedPostId} />
      )}
    </div>
  );
}


export default App;
