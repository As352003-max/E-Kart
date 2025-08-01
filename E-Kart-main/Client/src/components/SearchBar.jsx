// components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full p-4 bg-white shadow flex justify-center">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full max-w-2xl p-3 border rounded-lg shadow-sm focus:ring-indigo-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
