import { useState } from 'react';
import Icon from './Icon';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('');
  function submit(event) {
    event.preventDefault();
    onSearch(query);
  }

  return (
    <header className="topbar">
      <div className="brand-area">
        <button className="icon-button menu-button" aria-label="Menu"><Icon name="menu" /></button>
        <a className="brand" href="#home" aria-label="ITube home"><span className="brand-mark"><Icon name="play" size={19} /></span><strong>ITube</strong></a>
      </div>
      <div className="search-area">
        <form className="search-form" onSubmit={submit}><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" aria-label="Search" /><button type="submit" aria-label="Search"><Icon name="search" /></button></form>
        <button className="icon-button mic-button" aria-label="Search with your voice"><Icon name="mic" /></button>
      </div>
      <div className="header-actions"><button className="icon-button create-button"><Icon name="create" size={21} /><span>Create</span></button><button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell" /><i /></button><button className="profile-avatar" aria-label="Your account">J</button></div>
    </header>
  );
}
