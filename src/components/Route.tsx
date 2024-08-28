import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App.components';

const MainRoute: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* Маршрут с числовым параметром */}
				<Route path="/" element={<App />} />
				<Route path="/:id" element={<App />} />
				{/* Другие маршруты */}
			</Routes>
		</Router>
  );
}

export default MainRoute;
