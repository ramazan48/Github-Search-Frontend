import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function SearchGitHub() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchUsers();
    }
  };

  const handleSearchUsers = async () => {
    setLoading(true);
    setError(null);
    setUsers([]);
    setRepos({});

    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${username}`);
      const filteredUsers = response.data.items.filter((user) => user.login.toLowerCase() === username.toLowerCase());
      setUsers(filteredUsers);
      if (filteredUsers.length > 0) {
        filteredUsers.forEach(user => handleFetchRepos(user.login));
      }
    } catch (error) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRepos = async (login) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${login}/repos`);
      setRepos((prevRepos) => ({ ...prevRepos, [login]: response.data }));
    } catch (error) {
      setError(`Error fetching repositories for ${login}`);
    }
  };
  return (
    <div className='container'>
      <div className="input-container">
      <FontAwesomeIcon icon={faSearch} className='icon' />
      <input 
        type="text"
        value={username}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search GitHub"
        className="input-bar"/>
        <span className='span-container'>Tip For an <a href='https://github.com/search/advanced'>advanced search</a>, use our prefixes</span>
        </div>
        <img src='https://github.com/images/modules/search/home-desktop-light.webp' alt='github' className='main-image'></img>
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {users.length > 0 && (
        <div className='info-container'>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <img src={user.avatar_url} alt={user.login} width='90' className='info-image'/></a>
                {user.login}
                {repos[user.login] && (
                  <ul>
                    {repos[user.login].map((repo) => (
                      <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export  {SearchGitHub};
