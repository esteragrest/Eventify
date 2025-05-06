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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './profile-edit.module.css';
import { emailSchema, firstNameSchema, lastNameSchema } from '../../utils';
import { useDispatch } from 'react-redux';
import { updateUserAsync } from '../../actions';
import { convertDate } from './utils/convert-date';

const userDataShema = yup.object().shape({
	photo: yup
		.mixed()
		.required('Фото обязательно')
		.test(
			'isValidFileOrUrl',
			'Файл должен быть изображением (jpg, jpeg, png) или ссылкой',
			(value) => {
				if (!value) return false;

				if (typeof value === 'string') {
					return value.startsWith('http://') || value.startsWith('https://');
				}

				return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
			},
		),
	birth_date: yup
		.string()
		.test('isValidDate', 'Дата должна быть в формате YYYY-MM-DD', (value) => {
			if (!value) return true;
			return /^\d{4}-\d{2}-\d{2}$/.test(value);
		})
		.test('isPastDate', 'Дата рождения не может быть в будущем', (value) => {
			if (!value) return true;
			const selectedDate = new Date(value);
			const today = new Date();
			return selectedDate <= today;
		}),
	first_name: firstNameSchema,
	last_name: lastNameSchema,
	email: emailSchema,
	phone: yup
		.string()
		.required('Укажите номер телефона')
		.test(
			'isValidPhone',
			'Введите корректный номер телефона в международном формате (+1234567890)',
			(value) => {
				if (!value) return true;
				return /^\+?\d{10,15}$/.test(value);
			},
		),
});

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
		resolver: yupResolver(userDataShema),
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
