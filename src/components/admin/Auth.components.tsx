import React, { useState } from 'react';
import '../../styles/admin/auth.styles.scss';
import {useAuth}  from '../../hooks/auth.hooks';

interface AuthPopupProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthPopupProps> = ({ onAuthSuccess }) => {
  const {
		login,
		setLogin,
		password,
		setPassword,
		error,
		loading,
		handleLogin,
  } = useAuth(onAuthSuccess);

  return (
		<div className="overlay">
			<div className="modal">
				<h2>Авторизация <i className="icon-evil"></i></h2>
				<input
					className="input-auth"
					type="text"
					placeholder="Логин"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<input
					className="input-auth"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <p className="error">{error}</p>}
				<button className="button-auth" onClick={handleLogin} disabled={loading}>
					{loading ? 'Загрузка...' : 'Войти'}
				</button>
			</div>
		</div>
  );
};


export default Auth;

