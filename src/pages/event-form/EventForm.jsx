import {
	Button,
	ContentOverlay,
	CustomCheckbox,
	DateTimeInput,
	ErrorMessage,
	FileInput,
	Form,
	FormRow,
	Input,
	SelectableMenu,
	Textarea,
	TitleForm,
} from '../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AGE_LIMIT_TYPE, PAYMENT_TYPE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvent, selectUserId, selectUserRole } from '../../selectors';
import { loadEventAsync, RESET_EVENT_DATA, saveEventAsync } from '../../actions';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAccessEvent } from './utils/check-access-event';
import { convertDate, getEventUrl } from '../../utils';
import { eventValidationSchema } from '../../validations';
import styles from './event-form.module.css';

export const EventForm = () => {
	const currentUserId = useSelector(selectUserId);
	const currentUserRoleId = useSelector(selectUserRole);
	const event = useSelector(selectEvent);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isEditing = !!useMatch('/event/edit/:eventId');
	const params = useParams();
	const location = useLocation();
	const url = getEventUrl(params, location);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			photo: '',
			title: '',
			description: '',
			event_date: '',
			event_time: '',
			age_limit: '',
			payment: '',
			address: '',
			type: false,
			max_participants: '',
		},
		resolver: yupResolver(eventValidationSchema),
	});

	useEffect(() => {
		if (!isEditing) {
			dispatch(RESET_EVENT_DATA);
			return;
		}

		dispatch(loadEventAsync(url)).then(({ event }) => {
			if (event) {
				if (!checkAccessEvent(event, currentUserId, currentUserRoleId)) {
					navigate('/events');
					return;
				}

				reset({
					photo: event.photo || '',
					title: event.title || '',
					description: event.description || '',
					event_date: convertDate(event.eventDate) || '',
					event_time: event.eventTime || '',
					age_limit: event.ageLimit || '',
					payment: event.payment || '',
					address: event.address || '',
					type: event.type === 'closed',
					max_participants: event.maxParticipants || '',
				});
			}
		});
	}, [isEditing, url, dispatch, reset, navigate, currentUserId, currentUserRoleId]);

	const onSubmit = (eventFormData) => {
		const serverUrl = isEditing ? `/api/events/${event.id}` : '/api/events';
		const method = isEditing ? 'PUT' : 'POST';

		dispatch(saveEventAsync(eventFormData, serverUrl, method)).then(
			({ type, value }) => {
				if (type === 'accessLink') {
					navigate('/events');
				} else if (type === 'success') {
					const eventId = value.id || event.id;
					const accessLink = location.state?.accessLink;

					navigate(
						`/events/${eventId}${accessLink ? `?accessLink=${accessLink}` : ''}`,
					);
				}
				reset();
			},
		);
	};

	const handleSelectChange = (name) => (value) => setValue(name, value);

	const formError =
		errors?.photo?.message ||
		errors?.title?.message ||
		errors?.event_date?.message ||
		errors?.event_time?.message ||
		errors?.address?.message ||
		errors?.description?.message ||
		errors?.age_limit?.message ||
		errors?.type?.message ||
		errors?.max_participants?.message;

	if (!currentUserId) {
		navigate('/login');
		return;
	}

	return (
		<div className={styles['event-form-container']}>
			<TitleForm>Создайте свое мероприятие!</TitleForm>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FileInput
					register={register}
					setValue={setValue}
					defaultImage={isEditing ? event.photo : null}
				/>
				<Input
					type="text"
					name="event_title"
					id="event_title"
					placeholder="Название Вашего мероприятия"
					{...register('title')}
				/>
				<FormRow>
					<DateTimeInput
						type="date"
						name="event_date"
						id="event_date"
						label="Дата проведения:"
						{...register('event_date')}
					/>
					<DateTimeInput
						type="time"
						name="event_time"
						id="event_time"
						label="Время проведения:"
						{...register('event_time')}
					/>
				</FormRow>
				<Input
					type="text"
					name="event_address"
					id="event_address"
					placeholder="Полный адрес Вашего мероприятия"
					{...register('address')}
				/>
				<Textarea
					name="event_description"
					id="event_description"
					placeholder="Опишите Ваше мероприятие"
					{...register('description')}
				/>
				<FormRow>
					<SelectableMenu
						setValue={handleSelectChange('payment')}
						title="Тип оплаты"
						options={PAYMENT_TYPE}
						selectedValue={event.payment}
					/>
					<SelectableMenu
						setValue={handleSelectChange('age_limit')}
						title="Возрастное ограничение"
						options={AGE_LIMIT_TYPE}
						selectedValue={event.ageLimit}
					/>
				</FormRow>
				<div className={styles['input-wrapper']}>
					<Input
						type="number"
						name="participants"
						id="participants"
						placeholder="Максимальное количество участников"
						{...register('max_participants')}
					/>
					<ContentOverlay>
						<p className={styles['optional-text']}>Поле необязательное</p>
					</ContentOverlay>
				</div>
				{!isEditing && (
					<div className={styles['checkbox-wrapper']}>
						<CustomCheckbox
							content="Сделать мое мероприятие закрытым"
							{...register('type')}
						/>
					</div>
				)}
				{formError && <ErrorMessage>{formError}</ErrorMessage>}
				<Button type="submit" backgroundColor="#C0A2E2" disabled={!!formError}>
					Создать мероприятие
				</Button>
			</Form>
		</div>
	);
};
