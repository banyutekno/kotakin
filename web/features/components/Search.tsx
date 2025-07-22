import { useState } from 'react';

export function Search() {
  const [search, setSearch] = useState('');

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="input-group position-relative">
      <span className="input-group-text">
        <i className="bi bi-search text-secondary" />
      </span>
      <input
        type="text"
        className="form-control pe-5"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button
          type="button"
          className="btn position-absolute end-0 top-0 bottom-0 d-flex align-items-center px-3 border-0 bg-transparent"
          style={{ zIndex: 5 }}
          onClick={handleClearSearch}
        >
          <i className="bi bi-x-lg text-secondary" />
        </button>
      )}
    </div>
  );
}
