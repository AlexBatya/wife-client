import React, { useState } from 'react';
import Auth from './Auth.components';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Auth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          <h1>Admin Page</h1>
          <p>Welcome to the Admin page.</p>
        </>
      )}
    </div>
  );
};

export default Admin;

