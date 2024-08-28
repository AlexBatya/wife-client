import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import MainRoute from './components/Route'

// Найдите корневой элемент в вашем HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  // Создайте корневой элемент с помощью createRoot и отрендерьте ваше приложение
  const root = createRoot(rootElement);
  root.render(<MainRoute />);
}
