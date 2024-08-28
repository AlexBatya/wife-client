import React, { useState } from 'react';
import "../styles/tooltip.styles.scss"; // Подключите ваши стили

const Tooltip: React.FC<{ text: string, children: any }> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
		<div
			className="tooltip-container"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onClick={showTooltip}
			onTouchStart={showTooltip} // Для мобильных устройств
		>
			{children}
			{visible && (
				<div className="tooltip-box">
					{text}
				</div>
			)}
		</div>
  );
};

export default Tooltip;
