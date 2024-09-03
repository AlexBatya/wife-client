import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/newGuests.styles.scss';
import { Guest } from '../services/guests.services';
import Tooltip from './Tooltip.components';

interface NewGuestsProps {
  onGuestsChange: (guests: Guest[]) => void;
  resetGuestCountSignal: boolean; // Новый пропс для сигнала сброса
}

const NewGuests: React.FC<NewGuestsProps> = ({ onGuestsChange, resetGuestCountSignal }) => {
  const { id } = useParams<{ id: string }>();
  const [guestCount, setGuestCount] = useState<number>(0);
  const [guestNames, setGuestNames] = useState<string[]>([]);

  useEffect(() => {
		if (resetGuestCountSignal) {
			setGuestCount(0);
			setGuestNames([]);
			onGuestsChange([]); // Очистка списка гостей в верхнем компоненте
		}
  }, [resetGuestCountSignal, onGuestsChange]);

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const count = value === '' ? 0 : parseInt(value, 10);
		setGuestCount(count);

		const newGuestNames = Array(count).fill('').map((_, i) => guestNames[i] || '');
		setGuestNames(newGuestNames);
  };

  const handleGuestNameChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const newGuestNames = [...guestNames];
		newGuestNames[index] = e.target.value;
		setGuestNames(newGuestNames);

		const guests = newGuestNames.map((name) => ({
			id_guest: Number(id),
			full_name: name,
			attending: true,
		}));
		onGuestsChange(guests);
  };

  return (
		<div className="guest-input-container">
			<label htmlFor="guestCount" className="guest-input-label">
				Введите количество членов семьи, включая себя:

			</label>
			<input
				id="guestCount"
				type="tel"
				inputMode="numeric"
				pattern="[0-9]*"
				value={guestCount}
				onChange={handleGuestCountChange}
				className="guest-input-field"
				placeholder="Введите количество гостей"
			/>

			{Array.from({ length: guestCount }).map((_, index) => (
				<div key={index} className="guest-name-container">
					<label htmlFor={`guestName-${index}`} className="guest-name-label">
						ФИО Гостя {index + 1}:
					</label>
					<input
						id={`guestName-${index}`}
						type="text"
						value={guestNames[index]}
						onChange={(e) => handleGuestNameChange(index, e)}
						className="guest-name-input"
						placeholder="Введите ФИО гостя"
					/>
				</div>
			))}
		</div>
  );
};

export default NewGuests;

