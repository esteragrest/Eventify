import { Button, ErrorMessage, FormRow, Input } from '../../../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEventId, selectUserId } from '../../../../selectors';
import { addRegistrationAsync } from '../../../../actions';
import { eventRegistrationValidationSchema } from '../../../../validations'
import styles from './event-registration-form.module.css';

export const EventRegistrationForm = () => {
	const [serverError, setServerError] = useState('');
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const eventId = useSelector(selectEventId);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			participants: null,
		},
		resolver: yupResolver(eventRegistrationValidationSchema),
	});

	const onSubmit = ({ firstName, lastName, email, phone, participants }) => {
		const newRegistgration = {
			first_name: firstName,
			last_name: lastName || null,
			user_id: userId,
			event_id: eventId,
			email,
			phone,
			participants_count: participants,
		};

		dispatch(addRegistrationAsync(newRegistgration, reset));
	};

	const formError =
		errors?.firstName?.message ||
		errors?.lastName?.message ||
		errors?.email?.message ||
		errors?.phone?.message ||
		errors?.participants?.message;

	const errorMessage = formError || serverError;

	return (
		<div className={styles['event-form-container']}>
			<h4>Заполните форму, чтобы принять участие:</h4>
			<form
				className={styles['event-registgration-form']}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormRow>
					<Input
						type="text"
						name="first_name"
						placeholder="Ваше имя"
						width="50%"
						{...register('firstName', { onChange: () => setServerError('') })}
					/>
					<Input
						type="text"
						name="last_name"
						placeholder="Ваша фамилия"
						width="50%"
						{...register('lastName', { onChange: () => setServerError('') })}
					/>
				</FormRow>
				<Input
					type="email"
					name="email"
					placeholder="Ваш email"
					{...register('email', { onChange: () => setServerError('') })}
				/>
				<Input
					type="phone"
					name="phone"
					placeholder="Ваш телефон"
					{...register('phone', { onChange: () => setServerError('') })}
				/>
				<Input
					type="number"
					name="participants"
					placeholder="Количество участников от вас"
					{...register('participants', { onChange: () => setServerError('') })}
				/>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<Button backgroundColor="#E8FF59">Принять участие</Button>
			</form>
		</div>
	);
};
