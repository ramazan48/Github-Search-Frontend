import React from 'react';
import {SearchGitHub} from './SearchBar';
import './App.css';

const App = () => {

  return (
    <div className="App">
      <h1 className='title' >GitHub</h1>
      <SearchGitHub />
    </div>
  );
};

export default App;
