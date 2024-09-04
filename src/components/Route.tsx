import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App.components';
import Admin from './admin/Admin.components';

const MainRoute: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* Маршрут с числовым параметром */}
				<Route path="/" element={<App />} />
				<Route path="/:id" element={<App />} />

				{/* Маршрут для админа */}
				<Route path="/admin" element={<Admin />} />

			</Routes>
		</Router>
  );
}

export default MainRoute;
