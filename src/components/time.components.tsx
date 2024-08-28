import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import WOW from 'wowjs';
import 'animate.css';
import '../styles/time.styles.scss';
import '../styles/font.styles.scss';

import back from '../assets/img/3.png';
import wife from '../assets/img/wife.jpeg';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {

	useEffect(() => {
		new WOW.WOW({
			live: false, // Отключаем динамическое наблюдение за новыми элементами на странице
		}).init();
  }, []);

  const [timeLeft, setTimeLeft] = useState({
		weeks: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
  });

  useEffect(() => {
		const updateCountdown = () => {
			const now = new Date();
			const difference = targetDate.getTime() - now.getTime();

			if (difference <= 0) {
				setTimeLeft({
					weeks: 0,
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
				});
				return;
			}

			const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
			const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
			const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft({ weeks, days, hours, minutes, seconds });
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);

		return () => clearInterval(interval);
  }, [targetDate]);

  return (
		<div className="countdown">
			<div className="countdown__unit wow animate__animated animate__rotateIn">
				<div className="countdown__value">{timeLeft.weeks}</div>
				<div className="countdown__label">Недель</div>
			</div>
			<div className="countdown__unit wow animate__animated animate__rotateIn">
				<div className="countdown__value">{timeLeft.days}</div>
				<div className="countdown__label">Дней</div>
			</div>
			<div className="countdown__unit wow animate__animated animate__rotateIn">
				<div className="countdown__value">{timeLeft.hours}</div>
				<div className="countdown__label">Часов</div>
			</div>
			<div className="countdown__unit wow animate__animated animate__rotateIn">
				<div className="countdown__value">{timeLeft.minutes}</div>
				<div className="countdown__label">Минут</div>
			</div>
			<div className="countdown__unit wow animate__animated animate__rotateIn">
				<div className="countdown__value">{timeLeft.seconds}</div>
				<div className="countdown__label">Секунд</div>
			</div>
		</div>
  );
};

const Time: React.FC = () => {
  const targetDate = new Date('2024-09-21T18:00:00'); // Установите вашу дату

  return (
		<div className="time">
			<h1 className="AandN wow animate__animated animate__fadeInUp">Алексей & Надежда</h1>
			<p className="congratulations wow animate__animated animate__fadeInUp">ПРИГЛАШАЕМ ВАС РАЗДЕЛИТЬ С НАМИ НАШ САМЫЙ СЧАСТЛИВЫЙ ДЕНЬ</p>
			<p className="data wow animate__animated animate__zoomIn">21 СЕНТЯБРЯ 2024</p>
			<div className="wow time__body animate__animated animate__fadeInUp">
				<Countdown targetDate={targetDate} />
			</div>

		</div>
  );
};

export default Time;
