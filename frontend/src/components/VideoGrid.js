import VideoCard from './VideoCard';

export default function VideoGrid({ videos }) {
  if (!videos.length) return <div className="empty-state"><h2>No videos found</h2><p>Try a different search term.</p></div>;
  return <section className="video-grid" aria-label="Recommended videos">{videos.map(video => <VideoCard key={video.title} video={video} />)}</section>;
}
