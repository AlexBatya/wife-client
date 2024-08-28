import { useState, useEffect } from 'react';
import { FamilyService, Family } from '../services/family.services';

// Хук для получения всех семей
export const useFamilies = () => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const data = await FamilyService.getAllFamilies();
        setFamilies(data);
      } catch (err) {
        setError('Ошибка при загрузке семей');
      } finally {
        setLoading(false);
      }
    };

    fetchFamilies();
  }, []);

  return { families, loading, error };
};

// Хук для работы с действиями над семьёй
export const useFamilyActions = () => {
  const [error, setError] = useState<string | null>(null);

  const addFamily = async (familyData: Family) => {
    try {
      await FamilyService.addFamily(familyData);
    } catch (err) {
      setError('Ошибка при добавлении семьи');
    }
  };

  // Поддержка удаления как по ID, так и по имени
  const deleteFamily = async (identifier: number | string) => {
    try {
      await FamilyService.deleteFamily(identifier);
    } catch (err) {
      setError('Ошибка при удалении семьи');
    }
  };

  // Поддержка обновления как по ID, так и по имени
  const updateFamily = async (identifier: number | string, updatedData: Family) => {
    try {
      await FamilyService.updateFamily(identifier, updatedData);
    } catch (err) {
      setError('Ошибка при обновлении семьи');
    }
  };

  return { addFamily, deleteFamily, updateFamily, error };
};

// Хук для получения семьи по ID
export const useFamilyById = (id: number) => {
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const data = await FamilyService.getFamilyById(id);
        setFamily(data);
      } catch (err) {
        setError('Ошибка при загрузке семьи');
      } finally {
        setLoading(false);
      }
    };

    fetchFamily();
  }, [id]);

  return { family, loading, error };
};

// Новый хук для получения семьи по имени
export const useFamilyByName = (family_name: string) => {
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const data = await FamilyService.getFamilyByName(family_name);
        setFamily(data);
      } catch (err) {
        setError('Ошибка при загрузке семьи');
      } finally {
        setLoading(false);
      }
    };

    fetchFamily();
  }, [family_name]);

  return { family, loading, error };
};

