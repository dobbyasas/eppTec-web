import './App.scss';
import React, { useState } from 'react';
import Home from './Home/Home';
import PostDetail from './PostDetail/PostDetail'

function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
    setTimeout(() => setSelectedPostId(null), 300);
  };

  return (
    <div>
      {!selectedPostId ? (
        <Home onSelectPost={handleSelectPost} />
      ) : (
        <PostDetail postId={selectedPostId} onBack={handleBack} show={showDetail} />
      )}
    </div>
  );
}


export default App;
