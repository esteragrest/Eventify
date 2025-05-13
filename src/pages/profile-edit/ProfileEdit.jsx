import { useLocation, useNavigate } from 'react-router-dom';
import {
	Button,
	DateTimeInput,
	ErrorMessage,
	FileInput,
	Form,
	FormRow,
	Input,
	TitleForm,
} from '../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertDate } from '../../utils';
import { useDispatch } from 'react-redux';
import { updateUserAsync } from '../../actions';
import { userDataValidationShema } from '../../validations';
import styles from './profile-edit.module.css';

export const ProfileEdit = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id, firstName, lastName, birthDate, email, phone, photo } =
		location.state || {};

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			photo: photo,
			birth_date: convertDate(birthDate),
			first_name: firstName,
			last_name: lastName,
			email: email,
			phone: phone,
		},
		resolver: yupResolver(userDataValidationShema),
	});

	const onSubmit = (userFormData) => {
		dispatch(updateUserAsync(userFormData, id)).then(() => {
			navigate(-1);
			reset();
		});
	};

	const formError =
		errors?.photo?.message ||
		errors?.first_name?.message ||
		errors?.last_name?.message ||
		errors?.birth_date?.message ||
		errors?.email?.message ||
		errors?.phone?.message;

	return (
		<div className={styles['profile-edit-container']}>
			<TitleForm>Редактирование профиля</TitleForm>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FileInput register={register} setValue={setValue} defaultImage={photo} />
				<FormRow>
					<Input
						type="text"
						name="first_name"
						id="first_name"
						placeholder="Ваше имя"
						{...register('first_name')}
					/>
					<Input
						type="text"
						name="last_name"
						id="last_name"
						placeholder="Ваша фамилия"
						{...register('last_name')}
					/>
				</FormRow>
				<Input
					type="email"
					name="user_email"
					id="user_email"
					placeholder="Ваш email"
					{...register('email')}
				/>
				<Input
					type="phone"
					name="phone"
					placeholder="Ваш телефон"
					{...register('phone')}
				/>
				<DateTimeInput
					type="date"
					name="birth_date"
					id="birth_date"
					label="Дата рождения"
					{...register('birth_date')}
				/>
				{formError && <ErrorMessage>{formError}</ErrorMessage>}
				<Button type="submit" backgroundColor="#C0A2E2" disabled={!!formError}>
					Сохранить
				</Button>
			</Form>
		</div>
	);
};
