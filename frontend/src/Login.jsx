/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [GuestMode, setGuestMode] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };
  const handleClick = () => {
    setGuestMode = (true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      /*if (isGuest) {
        setLoading(false);
        navigate('/protected');
      }
      else {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/protected');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }

    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='guest'>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="submit" onClick={handleClick} disabled={GuestMode}>
            {GuestMode ? 'Logging in...' : 'Guest'}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;*/


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleClick = async () => {
    // Set username and password to "user" for guest mode;
    setError('')
    setUsername('user');
    setPassword('user');
    validateForm();
    // Call handleSubmit directly for guest mode
    await handleSubmit();
  };


  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!validateForm()) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {

      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/protected');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }
    }

    catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='guest'>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" onClick={handleClick} disabled={loading}>
            {loading ? 'Logging in...' : 'Guest'}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );

}

export default Login;
*/

/*no error in bit hguest and log inimport React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleClick = async () => {
    // Reset error when guest button is clicked
    setError('');

    // Set username and password to "user" for guest mode
    setUsername('user');
    setPassword('user');
    // Call handleSubmit directly for guest mode
    await handleSubmit();
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    // Check if username and password are "user" for guest mode
    if (username === 'user' && password === 'user') {
      setLoading(true);

      const formDetails = new URLSearchParams();
      formDetails.append('username', username);
      formDetails.append('password', password);

      try {
        const response = await fetch('http://localhost:8000/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formDetails,
        });

        setLoading(false);

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access_token);
          navigate('/protected');
        } else {
          const errorData = await response.json();
          setError(errorData.detail || 'Authentication failed!');
        }
      } catch (error) {
        setLoading(false);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='guest'>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" onClick={handleClick} disabled={loading}>
            {loading ? 'Logging in...' : 'Guest'}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;*/

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [GuestMode, setGuestMode] = useState(false);


  const navigate = useNavigate();

  const validateForm = () => {
    if (!GuestMode) {
      if (!username || !password) {
        setError('Username and password are required');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleClick = async () => {
    // Reset error when guest button is clicked
    setGuestMode = (true);
    // Set username and password to "user" for guest mode
    setUsername('user');
    setPassword('user');
    // Call handleSubmit directly for guest mode
    await handleSubmit();
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!validateForm()) return;

    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/protected');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='guest'>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" onClick={handleClick} disabled={loading}>
            {loading ? 'Logging in...' : 'Guest'}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event, isGuest = false) => {
    event.preventDefault();
    if (!isGuest && !validateForm()) return;
    setLoading(true);
    const formDetails = new URLSearchParams();

    if (isGuest) {

      formDetails.append('username', 'user');
      formDetails.append('password', 'user');
    }
    else {

      formDetails.append('username', username);
      formDetails.append('password', password);

    }

    try {
      /*if (isGuest) {
        setLoading(false);
        navigate('/protected');
      } else {*/
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/protected');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }
      /*}*/
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }

  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='guest'>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" onClick={(e) => handleSubmit(e, true)} disabled={loading}>
            {loading ? 'Logging in...' : 'Guest'}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;


