
import { useState } from 'react';
import { UserService, User } from '../services/user.services';

export const useAuth = (onAuthSuccess: (status: string) => void) => {
  const [login, setLogin] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData: User = await UserService.getUserByLogin(login);
      if (userData && login === userData.login && password === userData.password) {
        onAuthSuccess(userData.status); // Передаем статус пользователя
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (err) {
      setError('Ошибка при авторизации');
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
		status,
		setStatus,
    setLogin,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  };
};

