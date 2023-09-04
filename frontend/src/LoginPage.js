import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [redirectToNetWorth, setRedirectToNetWorth] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Sibhockey101!') {
      onLogin();
      setRedirectToNetWorth(true); // Set the redirect flag to true
      history.push('/networth');
    }
  };

  const onChangeText = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2 style={{ padding: '20px' }}>Please Enter a password to access this page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangeText}
        />
        <button style={{ marginLeft: '10px' }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;