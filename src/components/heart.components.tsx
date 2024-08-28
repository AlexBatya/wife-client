import React, { useEffect, useState } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import "../styles/heart.styles.scss";
import "animate.css";
import WOW from 'wowjs';
import heart from '../assets/img/heart.svg'; // Убедитесь, что путь к картинке указан правильно

const Heart: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
		new WOW.WOW({
			live: false, // Отключаем динамическое наблюдение за новыми элементами на странице
		}).init();

		const handleMouseMove = (e: MouseEvent) => {
			const { innerWidth, innerHeight } = window;
			const x = (e.clientX - innerWidth / 2) / innerWidth * 20;
			const y = (e.clientY - innerHeight / 2) / innerHeight * 20;
			setMouseOffset({ x, y });
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
  }, []);

  return (
		<ParallaxProvider>
			<div className="heart">
				<Parallax speed={2}>
					<img
						src={heart}
						className="heart__img wow animate__animated animate__zoomIn"
						alt="Heart"
						style={{ transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)` }}
					/>
				</Parallax>
				<Parallax speed={-1}>
					<div
						className="love alex wow animate__animated animate__fadeInDown"
						style={{ transform: `translate(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px)` }}
					>
						А
					</div>
				</Parallax>
				<Parallax speed={-1}>
					<div
						className="love nadi wow animate__animated animate__fadeInUp"
						style={{ transform: `translate(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px)` }}
					>
						Н
					</div>
				</Parallax>
			</div>
		</ParallaxProvider>
  );
};

export default Heart;

