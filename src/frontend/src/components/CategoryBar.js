const categories = ['All', 'Music', 'Gaming', 'Live', 'Podcasts', 'Cooking', 'Travel', 'Computer programming', 'Recently uploaded', 'Watched', 'New to you'];

export default function CategoryBar({ selected, onSelect }) {
  return <div className="category-bar" role="tablist" aria-label="Video categories">{categories.map(category => <button key={category} role="tab" aria-selected={selected === category} className={selected === category ? 'selected' : ''} onClick={() => onSelect(category)}>{category}</button>)}</div>;
}
