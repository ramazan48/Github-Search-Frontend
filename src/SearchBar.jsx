import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchGitHub() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchRepos();
    }
  };

  const fetchRepos = () => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    const userUrl = `https://api.github.com/users/${username}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', userUrl, true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const userData = JSON.parse(xhr.responseText);
        setUser(userData);
        
        const reposUrl = `https://api.github.com/users/${userData.login}/repos?per_page=100`;

        const xhrRepos = new XMLHttpRequest();
        xhrRepos.open('GET', reposUrl, true);
        xhrRepos.onload = function () {
          if (xhrRepos.status >= 200 && xhrRepos.status < 300) {
            const reposData = JSON.parse(xhrRepos.responseText);
            setRepos(reposData);
          } else {
            setError('ERROR: ' + username + ' could not be found');
          }
          setLoading(false);
        };
        xhrRepos.onerror = function () {
          setError('ERROR: ' + username + ' could not be found');
          setUsername('');
          setLoading(false);
        };
        xhrRepos.send();
      } else {
        setError('ERROR: ' + username + ' could not be found');
        setUsername('');
        setLoading(false);
      }
    };
    xhr.onerror = function () {
      setError('ERROR: ' + username + ' could not be found');
      setUsername('');

      setLoading(false);
    };
    xhr.send();
  };
  return (
    
    <div className='container'>
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}

      <div className="input-container" style={{width:'60%'}}>
      <FontAwesomeIcon icon={faSearch} className='icon'/>
      <input 
        type="text"
        value={username}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search GitHub"
        className="input-bar"
        style={{fontSize:'1.8vw', width:'70%'}}
        />
        <span className='span-container'>Tip For an <a href='https://github.com/search/advanced'>advanced search</a>, use our prefixes</span>
      </div>
        <img src='https://github.com/images/modules/search/home-desktop-light.webp' alt='github' className='main-image'></img>

        <div className='info-container'>
        {user && (
        <div>
          <h2>User and Repos</h2>
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="100" className='info-image' style={{width:'20%'}}/>
          <p><a href={user.html_url} target='_blank' rel='noopener noreferrer'>{user.login}</a></p>
        </div>
      )}

      {repos.length > 0 && (
        <div>
          <ol>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
      </div>
    </div>
  );
}

export  {SearchGitHub};
