import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SwipeButton from './swipeButton.components';
import Time from './time.components';
import Heart from './heart.components';
import Loader from './loader.components';
import Guest from './guest.components';
import NewGuests from './newGuests.components';
import SuccessPopup from './successPopup.components';
import "../styles/font.styles.scss";
import { Guest as GuestType, GuestService } from '../services/guests.services';

import back from '../assets/img/3.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [guests, setGuests] = useState<GuestType[]>([]);
  const [shouldContinueRight, setShouldContinueRight] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [resetGuestCountSignal, setResetGuestCountSignal] = useState(false); // Состояние для сигнала сброса

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
		if (document.readyState === "complete") {
			setIsLoading(false);
		} else {
			const handlePageLoad = () => {
				setIsLoading(false);
			};

			window.addEventListener('load', handlePageLoad);

			return () => {
				window.removeEventListener('load', handlePageLoad);
			};
		}
  }, []);

  const handleGuestsChange = (newGuests: GuestType[]) => {
		setGuests(newGuests);
		setResetGuestCountSignal(false); // Сбрасываем сигнал сброса, когда гости изменяются
  };

  const handleConfirm = async (confirmedGuests: GuestType[]) => {
		try {
			for (const guest of confirmedGuests) {
				await GuestService.addGuest(guest);
			}
			setGuests([]);
			setShouldContinueRight(true);
			setIsSuccessPopupOpen(true);
		} catch (err) {
			console.error('Ошибка при добавлении гостей:', err);
		}
  };

  const handleCancel = () => {
		setGuests([]);
		setShouldContinueRight(false);
		setResetGuestCountSignal(true); // Устанавливаем сигнал для сброса гостей
  };

  const handleCloseSuccessPopup = () => {
		setIsSuccessPopupOpen(false);
  };

  const style: React.CSSProperties = {
		width: "95vw",
		overflow: "hidden",
		display: "flex",
		alignItems: 'center',
		flexDirection: 'column',
		gap: "10px",
		fontFamily: "CormorantInfant-Bold"
  };

  const backStyle: React.CSSProperties = {
		width: "400px",
		height: "40px",
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		backgroundImage: "url(" + back + ")",
		backgroundSize: "cover",
		backgroundPosition: "center",
		borderRadius: "5px",
  };

  const back_img: React.CSSProperties = {
		padding: "20px 0",
		width: "400px",
		height: "100%",
		display: 'flex',
		flexDirection: "column",
		alignItems: 'center',
		justifyContent: "center",
		backgroundImage: "url(" + back + ")",
		backgroundRepeat: "no-repeat",
		backgroundColor: "rgba(0, 0, 0, 0.009)",
		backgroundSize: "cover",
		backgroundPosition: "center",
  };

  return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div style={style}>
					<Heart />
					<Time />
					<div style={back_img}>
						<div style={backStyle}></div>
						<Guest id={Number(id)} />
						<NewGuests 
							onGuestsChange={handleGuestsChange}
							resetGuestCountSignal={resetGuestCountSignal} // Передаем сигнал сброса
						/>
						<SwipeButton 
							guests={guests} 
							onConfirm={handleConfirm} 
							onCancel={handleCancel} 
							shouldContinueRight={shouldContinueRight}
							id = {Number(id)}
						/>
						<p style={{ userSelect: "none", padding: "20px 0" }}>Мы рады видеть вас на нашей свадьбе</p>
						<div style={backStyle}></div>
					</div>
				</div>
			)}
			<SuccessPopup isOpen={isSuccessPopupOpen} onClose={handleCloseSuccessPopup} />
		</>
  );
}

export default App;

