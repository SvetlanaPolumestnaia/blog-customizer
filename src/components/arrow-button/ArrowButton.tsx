import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

// Добавлен onClick для возможности клика по стрелке (чтобы открылась форма)
interface ArrowButtonProps {
    onClick: OnClick;
}

export const ArrowButton: React.FC<ArrowButtonProps & { isContainerOpen: boolean }> = ({ onClick, isContainerOpen }) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isContainerOpen ? styles.container_open : ''}`}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={`${styles.arrow} ${isContainerOpen ? styles.arrow_open : ''}`} />
		</div>
	);
};