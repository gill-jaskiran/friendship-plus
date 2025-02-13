import React, { useState } from 'react';
import '../styles/SearchPage.css'; 


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setResults(['No input detected. Please input a User\'s name']);
      return;
    }

    setResults([`User "${query}" not found`]);
  };

  return (
    <div className="search-container">
      <h1>Search Friendship Plus</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for friends, groups, clubs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-results">
        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
