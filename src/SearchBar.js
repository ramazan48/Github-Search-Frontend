// src/InputBar.js
import React, { useState } from 'react';
import './App.css';

const SearchBar = ({ onEnter }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onEnter(input);
      setInput('');
    }
  };

  return (
    <div className="input-container">
      <i class="bi bi-search"></i>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search GitHub"
        className="input-bar"/>
        <span className='span-container'>Tip For an advanced search, use our prefixes</span>
    </div>
  );
};

export default SearchBar;
