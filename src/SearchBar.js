import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchGitHub = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  


  const handleSearch = () => {
    if (query.trim() === '') return;

    const usersUrl = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;
    //new part

    const xhrUsers = new XMLHttpRequest();
    xhrUsers.open('GET', usersUrl, true);
    xhrUsers.onreadystatechange = function () {
      if (xhrUsers.readyState === 4) {
        if (xhrUsers.status === 200) {
          const response = JSON.parse(xhrUsers.responseText);
          if (response.items.length === 0) {
            alert('No users found.');
          } else {
            setUsers(response.items);
          }
          setQuery(''); 
        } else {
          setError(`Error: ${xhrUsers.status}`);
          setUsers([]);
        }
      }
    };
    xhrUsers.send();

    //new part
  };

  const handleKeyDown = (e) => {
    if (e.key == 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className='container'>
      <div className="input-container">
      <FontAwesomeIcon icon={faSearch} className='icon' />
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search GitHub"
        className="input-bar"/>
        <span className='span-container'>Tip For an <a href='https://github.com/search/advanced'>advanced search</a>, use our prefixes</span>
        </div>
        <img src='https://github.com/images/modules/search/home-desktop-light.webp'
      alt='github'
      className='main-image'>
      </img>
        {error && <p>{error}</p>}
      <div className='info-container'>
        <ul>
        <h2>Users</h2>
          {users.map(user => (
            <li key={user.id}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              <img src={user.avatar_url} alt={user.login} width='90' className='info-image'/>
                {user.login}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* new part*/}
    </div>
  </div>
  );
};

export { SearchGitHub };
