// src/App.js
import React from 'react';
import SearchBar from './SearchBar';
import './App.css';

const App = () => {
  const handleEnter = (input) => {
    alert(`You entered: ${input}`);
  };

  return (
    <div className="App">
      <h1>GitHub</h1>
      <SearchBar onEnter={handleEnter} />
      <img src='https://github.com/images/modules/search/home-desktop-light.webp'
      alt='github'
      className='image'>
      </img>
    </div>
  );
};

export default App;
