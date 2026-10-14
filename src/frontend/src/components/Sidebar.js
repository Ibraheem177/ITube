import Icon from './Icon';

const primary = [['home', 'Home'], ['shorts', 'Shorts'], ['subscriptions', 'Subscriptions']];
const library = [['history', 'History'], ['playlist', 'Playlists'], ['later', 'Watch later'], ['liked', 'Liked videos']];

function NavLink({ icon, children, active = false }) {
  return <a href={`#${children.toLowerCase().replaceAll(' ', '-')}`} className={`nav-link${active ? ' active' : ''}`}><Icon name={icon} size={22} /><span>{children}</span></a>;
}

export default function Sidebar() {
  return <aside className="sidebar"><nav><div className="nav-group">{primary.map(([icon, label], index) => <NavLink key={label} icon={icon} active={index === 0}>{label}</NavLink>)}</div><div className="nav-group library-group"><div className="nav-heading">You <span>›</span></div>{library.map(([icon, label]) => <NavLink key={label} icon={icon}>{label}</NavLink>)}</div><div className="nav-group subscriptions-group"><h3>Subscriptions</h3>{[['N', 'Northbound', '#476b57'], ['M', 'Maya Makes', '#d66b58'], ['C', 'Curious Planet', '#3194a2'], ['O', 'Olive & Thyme', '#648052']].map(([letter, name, color]) => <a href="#subscriptions" className="channel-link" key={name}><span className="mini-avatar" style={{ background: color }}>{letter}</span><span>{name}</span><i /></a>)}</div></nav><footer>About&nbsp; Press&nbsp; Copyright<br />Contact us&nbsp; Creators<br /><br />Terms&nbsp; Privacy&nbsp; Policy &amp; Safety<br />© 2026 Google LLC</footer></aside>;
}
