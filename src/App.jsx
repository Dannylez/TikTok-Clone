import { useState } from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer/index.jsx';
import FeedVideos from './components/FeedVideos/index.jsx';

function App() {
  return (
    <div className='App'>
      <main>
        <FeedVideos />
      </main>
    </div>
  );
}

export default App;
