import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AgentLogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('AgentToken');

    // Redirect to the login page
    navigate('/agent/login');
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default AgentLogOut;