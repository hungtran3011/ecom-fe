import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <form 
      className="flex h-12 px-4 justify-between items-center gap-3 flex-1 border border-[var(--md-sys-color-outline)] rounded-2xl"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 outline-none bg-transparent text-[var(--md-sys-color-on-surface)]"
        placeholder="Search..."
      />
      <button 
        type="submit"
        className="flex hover:bg-[var(--md-sys-color-surface-variant)] items-center justify-center p-2 rounded-full transition-colors"
      >
        <span className="mdi text-[var(--md-sys-color-on-surface)]">search</span>
      </button>
    </form>
  );
}