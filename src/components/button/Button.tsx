import { Text } from 'components/text';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
	disabled
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	disabled?: boolean
}) => {
	return (
		<button className={styles.button} type={type} onClick={onClick} disabled={disabled}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
