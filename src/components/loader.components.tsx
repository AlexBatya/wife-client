import React from 'react';
import '../styles/loader.styles.scss'; // Убедитесь, что путь к вашему SCSS файлу правильный

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;
