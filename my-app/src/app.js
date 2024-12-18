import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	//const [steps, setStep] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const clickBack = (index) => setActiveIndex(index - 1);

	const clickForward = (index) => setActiveIndex(index + 1);

	const startFrom0 = () => setActiveIndex(0);

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let isFirstStep = (index) => index === 0;

	let isLastStep = (index) => index === data.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{data[activeIndex]['content']}
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{data.map(({ id, title }, index) => (
							<li
								key={id}
								className={
									styles['steps-item'] +
									' ' +
									(index > activeIndex
										? ''
										: index === activeIndex
											? styles.done + ' ' + styles.active
											: styles.done)
								}
							>
								{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(index)}
								>
									{index + 1}
								</button>
								{/* При клике на кнопку установка выбранного шага в качестве активного */}
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={() => clickBack(activeIndex)}
							disabled={isFirstStep(activeIndex)}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={
								isLastStep(activeIndex)
									? startFrom0
									: () => clickForward(activeIndex)
							}
							// disabled={isLastStep(activeIndex)}
						>
							{isLastStep(activeIndex) ? 'Начать сначала' : 'Далее'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
