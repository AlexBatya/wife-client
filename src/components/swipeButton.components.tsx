import React, { useState, useRef, useEffect } from 'react';
import PopupCustom from './Popup.components';
import "../styles/swipeButton.styles.scss";
import "../styles/font.styles.scss";
import { Guest } from '../services/guests.services';
import {useFamilyActions} from '../controllers/family.controllers';
import {useGuestActions} from '../controllers/guests.controllers';

interface SwipeButtonProps {
  guests: Guest[];
  onConfirm: (guests: Guest[]) => void;
  onCancel: () => void;
  shouldContinueRight: boolean;
	id: number| undefined;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({ guests, onConfirm, onCancel, shouldContinueRight, id }) => {
  const [position, setPosition] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false); // Новое состояние для подтверждения при перемещении влево
  const [colorChanged, setColorChanged] = useState(false);
  const [currentGuests, setCurrentGuests] = useState<Guest[]>(guests); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

	const {deleteGuestByIdGuest} = useGuestActions();

  useEffect(() => {
		setCurrentGuests(guests); 

		if (guests.length === 0) {
			setErrorMessage('Пользователи не заданы, необходимо указать гостей и переместить ползунок в крайне правое положение.');
		} else {
			setErrorMessage(''); 
		}
  }, [guests]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
		const startX = 'clientX' in e ? e.clientX : e.touches[0].clientX;

		const handleMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
			const currentX = 'clientX' in moveEvent ? moveEvent.clientX : moveEvent.touches[0].clientX;

			if (containerRef.current && ballRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				const ballWidth = ballRef.current.offsetWidth;
				let newPosition = position + (currentX - startX);

				if (newPosition < 0) {
					newPosition = 0;
					setIsConfirmationPopupOpen(true); // Открыть подтверждение при перемещении влево
				}

				if (newPosition > containerWidth - ballWidth) newPosition = containerWidth - ballWidth;

				setPosition(newPosition);

				if (newPosition > 100 && !colorChanged) {
					setColorChanged(true);
					setIsPopupOpen(true);
				}

				if (newPosition <= 100 && colorChanged) {
					setColorChanged(false);
				}
			}
		};

		const handleMouseUp = () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('touchmove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('touchend', handleMouseUp);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('touchmove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('touchend', handleMouseUp);
  };

  const handleConfirm = () => {
		if (currentGuests.length === 0) { 
			setErrorMessage('Пользователи не заданы, необходимо указать гостей и переместить ползунок в крайне правое положение.');
			return;
		}

		setErrorMessage(''); 
		setIsPopupOpen(false);
		onConfirm(currentGuests); 
		if (containerRef.current) {
			const containerWidth = containerRef.current.offsetWidth;
			const ballWidth = ballRef.current?.offsetWidth || 0;
			setPosition(containerWidth - ballWidth); 
		}
  };

  const handleCancel = () => {
		setIsPopupOpen(false);
		setIsConfirmationPopupOpen(false); // Закрыть попап при отмене

		onCancel();
		setPosition(0); 
		setColorChanged(false);
  };

  const handleRemoveGuest = (index: number) => {
		const updatedGuests = currentGuests.filter((_, i) => i !== index);
		setCurrentGuests(updatedGuests);

		if (updatedGuests.length === 0) {
			setErrorMessage('Пользователи не заданы, необходимо указать гостей и переместить ползунок в крайне правое положение.');
		}
  };

  const handleConfirmCancelation = () => {
		// Удаляем всех гостей и обнуляем счетчик
		setCurrentGuests([]);
		onCancel(); // Используем существующую логику отмены
		deleteGuestByIdGuest(Number(id));
		setIsConfirmationPopupOpen(false); // Закрыть подтверждение
		setPosition(0); 
		setColorChanged(false);
  };

  return (
		<div>
			<div
				className="swipeButton"
				ref={containerRef}
				style={{
					backgroundColor: colorChanged ? '#f5b3bc' : 'rgba(220, 220, 220, 0.8)',
				}}
				onMouseDown={handleMouseDown}
				onTouchStart={handleMouseDown}
			>
				{position < 100 ? <p className="go">Подтвердите!</p> : <p className="go">Отлично!!</p>}
				<div
					className="swipeButton__ball icon-arrow-right2"
					ref={ballRef}
					style={{
						left: `${position}px`,
					}}
				></div>
			</div>

			<PopupCustom isOpen={isPopupOpen} onClose={handleCancel}>
				<h2>Подтверждение гостей</h2>
				{errorMessage && <p className="error-message">{errorMessage}</p>}
				<ul>
					{currentGuests.length > 0 ? (
						currentGuests.map((guest, index) => (
							<li key={index} className="guest-list-item">
								{guest.full_name}
								<button onClick={() => handleRemoveGuest(index)} className="remove-button">Удалить</button>
							</li>
						))
					) : (
						<li>Нет гостей для отображения</li>
					)}
				</ul>
				<div className="btms">
					<button className="btm" onClick={handleConfirm}>Отправить</button>
					<button className="btm" onClick={handleCancel}>Отмена</button>
				</div>
			</PopupCustom>

			<PopupCustom isOpen={isConfirmationPopupOpen} onClose={handleCancel}>
				<h2>Вы действительно хотите отменить подтверждение?</h2>
				<p>Все гости будут удалены.</p>
				<ul>
					{currentGuests.length > 0 ? (
						currentGuests.map((guest, index) => (
							<li key={index} className="guest-list-item">
								{guest.full_name}
							</li>
						))
					) : (
						<li>Нет гостей для отображения</li>
					)}
				</ul>
				<div className="btms">
					<button className="btm" onClick={handleConfirmCancelation}>Подтвердить</button>
					<button className="btm" onClick={handleCancel}>Отмена</button>
				</div>
			</PopupCustom>
		</div>
  );
};

export default SwipeButton;

