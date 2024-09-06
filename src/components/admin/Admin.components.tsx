import React, { useState } from 'react';
import Auth from './Auth.components';
import "../../styles/admin/admin.styles.scss"
import FamilyTable from './FamilyTable.components';
import GuestTable from './GuestTable.components';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showFirstTable, setShowFirstTable] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Состояние для проверки прав администратора
  const [userStatus, setUserStatus] = useState<any>(''); // Добавляем состояние для статуса

  const handleAuthSuccess: any = (status: any) => {
		setIsAuthenticated(true);

  	setUserStatus(status); // Устанавливаем статус пользователя
		console.log(status)	
		if(status == "admin"){
			setIsAdmin(true); // Установим права пользователя (здесь, например, как администратора)
		}
		else {
			setIsAdmin(false); // Установим права пользователя (здесь, например, как администратора)
		}
  };

  return (
		<div className="admin-container">
			{!isAuthenticated ? (
				<Auth onAuthSuccess={handleAuthSuccess} />
			) : (
				<>
					<div className="status-bar">
						<span>Статус: {isAdmin ? 'admin' : 'user'} <i className = "icon-hipster"></i></span>
					</div>
					<div className="table-buttons">
						<button className="btmadmin family_button" onClick={() => setShowFirstTable(true)}>Семьи</button>
						<button className="btmadmin guest_button" onClick={() => setShowFirstTable(false)}>Гости</button>
					</div>
					{showFirstTable ? <FamilyTable isAdmin={isAdmin} /> : <GuestTable isAdmin={isAdmin} />}
				</>
			)}
		</div>
  );
};

export default Admin;

