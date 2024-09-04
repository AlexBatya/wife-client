import React, { useState } from 'react';
import Auth from './Auth.components';
import "../../styles/admin/admin.styles.scss"
import FamilyTable from './FamilyTable.components';
import GuestTable from './GuestTable.components';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showFirstTable, setShowFirstTable] = useState(true);

  const handleAuthSuccess = () => {
		setIsAuthenticated(true);
  };

  return (
		<div>
			{!isAuthenticated ? (
				<Auth onAuthSuccess={handleAuthSuccess} />
			) : (
				<>
					<button className = "btmadmin family_button" onClick={() => setShowFirstTable(true)}>Семьи</button>
					<button className = "btmadmin guest_button" onClick={() => setShowFirstTable(false)}>Гости</button>

					{showFirstTable ? <FamilyTable /> : <GuestTable />}
				</>
			)}
		</div>
  );
};

export default Admin;

