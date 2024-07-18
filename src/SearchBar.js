// src/InputBar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
    <div className='container'>
      <div className="input-container">
      <FontAwesomeIcon icon={faSearch} className='icon' />
      <input 
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search GitHub"
        className="input-bar"/>
        <span className='span-container'>Tip For an <a href='https://github.com/search/advanced'>advanced search</a>, use our prefixes</span>
    </div>
    </div>
  );
};

export default SearchBar;
