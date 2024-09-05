import React, { useState, useEffect, useRef } from 'react';
import '../../styles/admin/familyTable.styles.scss';
import { useFamilies, useFamilyActions } from '../../controllers/family.controllers';
import { Family } from '../../services/family.services';

interface FirstTableRow {
  id: number;
  family_name: string;
  text: string;
  presence: any;
}

const FamilyTable: React.FC = () => {
  const { families, refetchFamilies } = useFamilies();
  const { updateFamily, addFamily, deleteFamily } = useFamilyActions();  // Добавляем deleteFamily

  const data: FirstTableRow[] = families.map(family => ({
    id: family.id || 0,
    family_name: family.family_name,
    text: family.text,
    presence: family.presence
  }));

  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editData, setEditData] = useState<FirstTableRow | null>(null);

  const tableRef = useRef<HTMLTableElement>(null);

  const handleEditClick = (row: FirstTableRow) => {
    setEditRowId(row.id);
    setEditData({ ...row });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FirstTableRow) => {
    if (editData) {
      setEditData({ ...editData, [field]: e.target.value });
    }
  };

  const handleClickOutside = async (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
      if (editRowId !== null && editData) {
        try {
          await updateFamily(editRowId, editData);
          await refetchFamilies();
          setEditRowId(null);
        } catch (error) {
          console.error('Ошибка при обновлении данных:', error);
        }
      } else {
        setEditRowId(null);
      }
    }
  };

  const handleSaveClick = async () => {
    if (editRowId !== null && editData) {
      try {
        await updateFamily(editRowId, editData);
        await refetchFamilies();
        setEditRowId(null);
      } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
      }
    }
  };

  // Функция для добавления новой строки
  const handleAddClick = async () => {
    const defaultData: Family = {
      id: 0,  // ID будет автоматически назначен базой данных
      family_name: 'Новая семья',
      text: 'Текст приглашения',
      presence: false // Или любое другое дефолтное значение
    };

    try {
      await addFamily(defaultData);
      await refetchFamilies();  // Обновляем таблицу после добавления
    } catch (error) {
      console.error('Ошибка при добавлении семьи:', error);
    }
  };

  // Функция для удаления строки
  const handleDeleteClick = async () => {
    if (editRowId !== null) {
      try {
        await deleteFamily(editRowId);  // Удаляем семью
        await refetchFamilies();  // Обновляем таблицу после удаления
        setEditRowId(null);
      } catch (error) {
        console.error('Ошибка при удалении семьи:', error);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editRowId, editData]);

  return (
    <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>
            <th className="th_header">id</th>
            <th className="th_header">Фамилия</th>
            <th className="th_header">Текст приглашения</th>
            <th className="th_header">Присутствие</th>
            {editRowId !== null && <th className="th_header">Действия</th>} {/* Добавляем заголовок "Действия" */}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td
                className="th_body id"
                data-label="id"
                onClick={() => handleEditClick(row)}
              >
                {row.id} <i className="icon-cogs"></i>
              </td>
              <td className="th_body" data-label="Фамилия">
                {editRowId === row.id ? (
                  <input
                    className="changeInput"
                    type="text"
                    value={editData?.family_name || ''}
                    onChange={(e) => handleChange(e, 'family_name')}
                  />
                ) : (
                  row.family_name
                )}
              </td>
              <td className="th_body" data-label="Текст приглашения">
                {editRowId === row.id ? (
                  <input
                    className="changeInput"
                    type="text"
                    value={editData?.text || ''}
                    onChange={(e) => handleChange(e, 'text')}
                  />
                ) : (
                  row.text
                )}
              </td>
              <td className="th_body" data-label="Присутствие">
                {editRowId === row.id ? (
                  <input
                    className="changeInput"
                    type="text"
                    value={editData?.presence || ''}
                    onChange={(e) => handleChange(e, 'presence')}
                  />
                ) : (
                  (!row.presence ? "-" : "+")
                )}
              </td>
              {editRowId === row.id && (
                <td className="th_body actions" data-label="Действия">
                  <button
                    className="delete-button"
                    onClick={handleDeleteClick}
                  >
                    Удалить <i className = "icon-bin2"></i>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {editRowId !== null && (
        <button
          className="save-button"
          onClick={handleSaveClick}
        >
          Сохранить
        </button>
      )}
      <button
        className="add-button"
        onClick={handleAddClick}
      >
        Добавить
      </button>
    </div>
  );
};

export default FamilyTable;

