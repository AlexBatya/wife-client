import { useState, useEffect } from 'react';
import { GuestService, Guest } from '../services/guests.services';

export const useGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const data = await GuestService.getAllGuests();
        setGuests(data);
      } catch (err) {
        setError('Ошибка при загрузке гостей');
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  return { guests, loading, error };
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

  const deleteGuest = async (full_name: string) => {
    try {
      await GuestService.deleteGuest(full_name);
    } catch (err) {
      setError('Ошибка при удалении гостя');
    }
  };

  const deleteGuestById = async (id: number) => {
    try {
      await GuestService.deleteGuestById(id);
    } catch (err) {
      setError('Ошибка при удалении гостя по ID');
    }
  };

  const deleteGuestByIdGuest = async (id_guest: number) => {
    try {
      await GuestService.deleteGuestByIdGuest(id_guest);
    } catch (err) {
      setError('Ошибка при удалении гостя по ID гостя');
    }
  };

  const updateGuest = async (full_name: string, updatedData: Guest) => {
    try {
      await GuestService.updateGuest(full_name, updatedData);
    } catch (err) {
      setError('Ошибка при обновлении гостя');
    }
  };

  return { addGuest, deleteGuest, deleteGuestById, deleteGuestByIdGuest, updateGuest, error };
};

export const useGuestById = (id: number) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const data = await GuestService.getGuestById(id);
        setGuest(data);
      } catch (err) {
        setError('Ошибка при загрузке гостя');
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [id]);

  return { guest, loading, error };
};

export const useGuestByName = (full_name: string) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const data = await GuestService.getGuestByName(full_name);
        setGuest(data);
      } catch (err) {
        setError('Ошибка при загрузке гостя');
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [full_name]);

  return { guest, loading, error };
};

