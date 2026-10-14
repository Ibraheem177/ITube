import { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryBar from './components/CategoryBar';
import VideoGrid from './components/VideoGrid';
import videos from './data/videos';
import './App.css';

function App() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const visibleVideos = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return videos.filter(video => !needle || `${video.title} ${video.channel}`.toLowerCase().includes(needle));
  }, [search]);

  return <div className="app-shell" id="home"><Header onSearch={setSearch} /><Sidebar /><main className="main-content"><CategoryBar selected={category} onSelect={setCategory} /><div className="feed-content"><VideoGrid videos={visibleVideos} /></div></main></div>;
}

export default App;
