import React, { useState, useEffect, useRef } from 'react';
import '../../styles/admin/guestTable.styles.scss';
import { useGuests, useGuestActions } from '../../controllers/guests.controllers';
import { Guest } from '../../services/guests.services';

interface GuestTableRow {
  id: number;
  id_guest: number | undefined;
  full_name: string;
  attending: any;
  invitation_text: string;
  plus_one: any;
  family: any;
}

interface GuestTableProps {
  isAdmin: boolean;
}

const GuestTable: React.FC<GuestTableProps> = ({ isAdmin }) => {
  const { guests, refetchGuests } = useGuests();
  const { updateGuest, addGuest, deleteGuest } = useGuestActions();

  const data: GuestTableRow[] = guests.map(guest => ({
    id: guest.id || 0,
    id_guest: guest.id_guest,
    full_name: guest.full_name,
    attending: guest.attending,
    invitation_text: guest.invitation_text,
    plus_one: guest.plus_one,
    family: guest.family
  }));

  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editData, setEditData] = useState<GuestTableRow | null>(null);

  const tableRef = useRef<HTMLTableElement>(null);

  const handleEditClick = (row: GuestTableRow) => {
    if (isAdmin) {
      setEditRowId(row.id);
      setEditData({ ...row });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof GuestTableRow) => {
    if (editData) {
      setEditData({ ...editData, [field]: e.target.value });
    }
  };

  const handleClickOutside = async (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
      if (editRowId !== null && editData) {
        try {
          await updateGuest(editRowId, editData);
          await refetchGuests();
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
    if (isAdmin && editRowId !== null && editData) {
      try {
        await updateGuest(editRowId, editData);
        await refetchGuests();
        setEditRowId(null);
      } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
      }
    }
  };

  const handleAddClick = async () => {
    if (isAdmin) {
      const defaultData: Guest = {
        id: 0,
        id_guest: 0,
        full_name: 'Новый гость',
        attending: false,
        invitation_text: 'Текст приглашения',
        plus_one: false,
        family: null
      };

      try {
        await addGuest(defaultData);
        await refetchGuests();
      } catch (error) {
        console.error('Ошибка при добавлении гостя:', error);
      }
    }
  };

  const handleDeleteClick = async () => {
    if (isAdmin && editRowId !== null) {
      try {
        await deleteGuest(editRowId);
        await refetchGuests();
        setEditRowId(null);
      } catch (error) {
        console.error('Ошибка при удалении гостя:', error);
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
            <th className="th_header">id гостя</th>
            <th className="th_header">ФИО гостя</th>
            {isAdmin && editRowId !== null && <th className="th_header">Действия</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="th_body id" data-label="id" onClick={() => isAdmin && handleEditClick(row)}>
                {row.id} {isAdmin && <i className="icon-cogs"></i>}
              </td>
              <td className="th_body" data-label="id гостя">
                {editRowId === row.id && isAdmin ? (
                  <input
                    className="changeInput"
                    type="text"
                    value={editData?.id_guest || ''}
                    onChange={(e) => handleChange(e, 'id_guest')}
                  />
                ) : (
                  row.id_guest
                )}
              </td>
              <td className="th_body" data-label="ФИО гостя">
                {editRowId === row.id && isAdmin ? (
                  <input
                    className="changeInput"
                    type="text"
                    value={editData?.full_name || ''}
                    onChange={(e) => handleChange(e, 'full_name')}
                  />
                ) : (
                  row.full_name
                )}
              </td>
              {isAdmin && editRowId === row.id && (
                <td className="th_body actions" data-label="Действия">
                  <button className="delete-button" onClick={handleDeleteClick}>
                    Удалить <i className="icon-bin2"></i>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && editRowId !== null && (
        <button className="save-button" onClick={handleSaveClick}>
          Сохранить
        </button>
      )}
      {isAdmin && (
        <button className="add-button" onClick={handleAddClick}>
          Добавить
        </button>
      )}
    </div>
  );
};

export default GuestTable;

