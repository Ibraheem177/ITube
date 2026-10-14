import Icon from './Icon';

export default function VideoCard({ video }) {
  return <article className="video-card"><a href="#watch" className="thumbnail-link" aria-label={`Play ${video.title}`}><img className="thumbnail" src={`https://images.unsplash.com/${video.image}?auto=format&fit=crop&w=720&q=85`} alt="" /><span className="duration">{video.duration}</span><span className="hover-play"><Icon name="play" size={28} /></span></a><div className="video-details"><span className="channel-avatar" style={{ background: video.color }}>{video.avatar}</span><div className="video-copy"><a href="#watch" className="video-title">{video.title}</a><a href="#channel" className="channel-name">{video.channel}<span className="verified">✓</span></a><p>{video.views} <span>·</span> {video.age}</p></div><button className="card-more" aria-label="More options"><Icon name="more" size={21} /></button></div></article>;
}
