import React, { useState, useEffect } from 'react';
import WOW from 'wowjs';
import 'animate.css';
import "../styles/guest.styles.scss";

import wife from '../assets/img/wife.png';
import husband from '../assets/img/husband.png';
import back from '../assets/img/3.png';

import { Family as FamilyType, FamilyService } from '../services/family.services'; // Импорт типов и сервиса

interface GuestProps {
  id: number;
}

const Guest: React.FC<GuestProps> = ({ id }) => {
  const [family, setFamily] = useState<FamilyType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
		new WOW.WOW({
			live: false, // Отключаем динамическое наблюдение за новыми элементами на странице
		}).init();
  }, []);

  useEffect(() => {
		const fetchFamily = async () => {
			try {
				const familyData = await FamilyService.getFamilyById(id); // Запрос на сервер для получения данных семьи
				setFamily(familyData);
			} catch (err) {
				setError('Ошибка при загрузке данных семьи');
			} finally {
				setLoading(false);
			}
		};

		fetchFamily();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!family) return <p>Семья не найдена</p>;

  return (
		<div className="guest">
			<div className="guest__body">
				<h2 className="wow animate__animated animate__fadeInUp">{family.text ? family.text : "Уважаемый гость"}</h2>
				<p className="wow animate__animated animate__fadeInUp">
					Мы рады сообщить Вам, что 21.09.2024 состоится самое главное торжество в нашей жизни - день нашей свадьбы!
				</p>
				<h4 className="wow animate__animated animate__fadeInUp">Ждём вас!</h4>
				<p className="wow animate__animated animate__fadeInUp">
					Ленинградская улица, 71, кафе "Купидон" г.Уссурийск, Приморский край					
				</p>
				<h4 className="wow animate__animated animate__fadeInUp">Там, где царит взаимность, рождается счастье</h4>
				<div className="our">
					<div className="wow animate__animated our_one animate__fadeInLeft">
						<img src={husband} alt="Husband" />
					</div>
					Алексей
					<div className="our_one wow animate__animated our_one animate__fadeInRight">
						<img src={wife} alt="Wife" />
					</div>
					Надежда
				</div>
				<h4 className="wow animate__animated animate__fadeInUp">Подтверждение</h4>
				<p className="wow animate__animated animate__fadeInUp">
					Пожалуйста подтвердите свое присутствие до 16.09.2024
				</p>
				<h4 className="end wow animate__animated animate__fadeInUp">С НЕТЕРПЕНИЕМ ОЖИДАЕМ ВАС НА НАШЕЙ СВАДЬБЕ</h4>
			</div>
		</div>
  );
};

export default Guest;

