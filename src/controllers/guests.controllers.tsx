import { useState, useEffect, useCallback } from 'react';
import { GuestService, Guest } from '../services/guests.services';

export const useGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = useCallback(async () => {
    try {
      const data = await GuestService.getAllGuests();
      setGuests(data);
    } catch (err) {
      setError('Ошибка при загрузке гостей');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  return { guests, loading, error, refetchGuests: fetchGuests }; // Добавляем refetchGuests
};

export const useGuestActions = () => {
  const [error, setError] = useState<string | null>(null);

  const addGuest = async (guestData: Guest) => {
    try {
      await GuestService.addGuest(guestData);
    } catch (err) {
      setError('Ошибка при добавлении гостя');
    }
  };

  const deleteGuest = async (identifier: number | string) => {
		try {
			await GuestService.deleteGuestById(Number(identifier));  // Преобразование в строку
		} catch (err) {
			setError('Ошибка при удалении гостя');
		}
	};

	const updateGuest = async (identifier: number | string, updatedData: Guest) => {
		try {
			await GuestService.updateGuestById(Number(identifier), updatedData);  // Преобразование в строку
		} catch (err) {
			setError('Ошибка при обновлении гостя');
		}
	};

  return { addGuest, deleteGuest, updateGuest, error };
};

