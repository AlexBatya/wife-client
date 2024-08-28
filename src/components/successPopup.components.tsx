// src/components/SuccessPopup.tsx
import React from 'react';
import "../styles/successPopup.styles.scss"; // Ваши стили для попапа

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
		<div className="success-popup">
			<div className="success-popup-content">
				<h2>Гости успешно добавлены!</h2>
				<button onClick={onClose} className="success-popup-close">
					Закрыть
				</button>
			</div>
		</div>
  );
};

export default SuccessPopup;
