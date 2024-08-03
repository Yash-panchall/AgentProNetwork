import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('AdminToken');

    // Redirect to the login page
    navigate('/admin/login');
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default AdminLogOut;