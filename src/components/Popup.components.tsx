import React from 'react';
import ReactModal from 'react-modal';
import '../styles/popup.styles.scss'; // Убедитесь, что путь правильный

interface PopupCustomProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopupCustom: React.FC<PopupCustomProps> = ({ isOpen, onClose, children }) => {
  return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Popup"
			className="custom-modal"
			overlayClassName="custom-overlay"
			ariaHideApp={false} // Отключаем требование aria-hidden для улучшения доступности
		>
			<div className="modal-content">
				{children}
			</div>
		</ReactModal>
  );
};

export default PopupCustom;

