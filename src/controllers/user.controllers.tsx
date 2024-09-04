import { useState, useEffect } from 'react';
import { UserService, User } from '../services/user.services';

// Хук для получения всех пользователей
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAllUsers();
        setUsers(data);
      } catch (err) {
        setError('Ошибка при загрузке пользователей');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

// Хук для работы с действиями над пользователем
export const useUserActions = () => {
  const [error, setError] = useState<string | null>(null);

  const addUser = async (userData: Omit<User, 'id'>) => {
    try {
      await UserService.addUser(userData);
    } catch (err) {
      setError('Ошибка при добавлении пользователя');
    }
  };

  // Поддержка удаления как по ID, так и по логину
  const deleteUser = async (identifier: number | string) => {
    try {
      if (typeof identifier === 'number') {
        await UserService.deleteUserById(identifier);
      } else {
        await UserService.deleteUserByLogin(identifier);
      }
    } catch (err) {
      setError('Ошибка при удалении пользователя');
    }
  };

  // Поддержка обновления как по ID, так и по логину
  const updateUser = async (identifier: number | string, updatedData: Partial<User>) => {
    try {
      if (typeof identifier === 'number') {
        await UserService.updateUserById(identifier, updatedData);
      } else {
        await UserService.updateUserByLogin(identifier, updatedData);
      }
    } catch (err) {
      setError('Ошибка при обновлении пользователя');
    }
  };

  return { addUser, deleteUser, updateUser, error };
};

// Хук для получения пользователя по ID
export const useUserById = (id: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await UserService.getUserById(id);
        setUser(data);
      } catch (err) {
        setError('Ошибка при загрузке пользователя');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};

// Хук для получения пользователя по логину
export const useUserByLogin = (login: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await UserService.getUserByLogin(login);
        setUser(data);
      } catch (err) {
        setError('Ошибка при загрузке пользователя');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [login]);

  return { user, loading, error };
};

