import { CAPABILITIES } from './data';
import { Capability } from './capability/Capability';
import styles from './capabilities.module.css';

export const Capabilities = () => {
	return (
		<div className={styles['capabilities-container']}>
			<h2>Ваш инструмент для создания идеальных мероприятий!</h2>
			<div className={styles.capabilities}>
				{CAPABILITIES.map(({ id, title, description, icon, color }) => (
					<Capability
						key={id}
						title={title}
						description={description}
						icon={icon}
						color={color}
					/>
				))}
			</div>
		</div>
	);
};
