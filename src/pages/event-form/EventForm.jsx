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
		TitleForm
} from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { AGE_LIMIT_TYPE, PAYMENT_TYPE } from '../../constans';
import styles from './event-form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { saveEventAsync } from '../../actions';
import { useNavigate } from 'react-router-dom';

const eventSchema = yup.object().shape({
    photo: yup
        .mixed()
        .required("Фото обязательно")
        .test("fileType", "Файл должен быть изображением (jpg, jpeg, png)", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
    title: yup
        .string()
        .required("Название мероприятия обязательно")
        .min(3, "Название должно содержать минимум 3 символа")
        .max(50, "Название должно содержать не более 50 символов"),
    description: yup
        .string()
        .required("Описание мероприятия обязательно")
        .max(500, "Описание не должно превышать 500 символов"),
    age_limit: yup
        .string()
        .required("Возрастное ограничение обязательно")
        .oneOf(["no_limit", "14+", "16+", "18+"], "Недопустимое значение возрастного ограничения"),
	payment: yup
        .string()
        .required("Тип оплаты обязателен")
        .oneOf(["free", "paid"], "Недопустимое значение типа оплаты"),
	event_date: yup
        .string()
        .required("Дата обязательна")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Дата должна быть в формате YYYY-MM-DD")
        .test("isValidDate", "Дата не может быть меньше текущей", (value) => {
            if (!value) return false;
            return new Date(value) >= new Date();
        }),
    event_time: yup
        .string()
        .required("Время обязательно"),
    address: yup
        .string()
        .required("Адрес обязателен"),
	type: yup.boolean(),
	max_participants: yup.number()
			.transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
			.min(1, 'Минимальное количество участников — 1')
});


export const EventForm = () => {
	const userId = useSelector(selectUserId)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isValid}
	} = useForm({ defaultValues:{
		photo: '',
		title: '',
		description: '',
		event_date: '',
		event_time: '',
		age_limit: '',
		payment: '',
		address: '',
		type: false,
		max_participants: ''
	},
	resolver: yupResolver(eventSchema)
	})

	const onSubmit = (eventFormData) => {
		const url = '/api/events'
		const method = 'POST'

		dispatch(saveEventAsync(eventFormData, userId, url, method)).then(({ type, value }) => {
			if(type === 'accessLink') {
				navigate('/events')
			} else if (type === 'event') {
				navigate(`/events/${value.id}`)
			}
			reset()
		})
	}

	const handleSelectChange = (name) => (value) => setValue(name, value);

	if(!userId) {
		navigate("/login")
		return
	}

    return (
        <div className={styles['event-form-container']}>
            <TitleForm>Создайте свое мероприятие!</TitleForm>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput register={register} setValue={setValue}/>
                <Input type="text" name="event_title" id="event_title" placeholder="Название Вашего мероприятия" {...register('title')} />
                <FormRow>
                    <DateTimeInput type="date" name="event_date" id="event_date" {...register('event_date')} />
                    <DateTimeInput type="time" name="event_time" id="event_time" {...register('event_time')} />
                </FormRow>
                <Input type="text" name="event_address" id="event_address" placeholder="Полный адрес Вашего мероприятия" {...register('address')} />
                <Textarea name="event_description" id="event_description" placeholder="Опишите Ваше мероприятие" {...register('description')} />
				<FormRow>
					<SelectableMenu setValue={handleSelectChange('payment')} title='Тип оплаты' options={PAYMENT_TYPE} />
					<SelectableMenu setValue={handleSelectChange('age_limit')} title='Возрастное ограничение' options={AGE_LIMIT_TYPE} />
				</FormRow>
                <div className={styles['input-wrapper']}>
                    <Input type="number" name="participants" id="participants" placeholder="Максимальное количество участников" {...register('max_participants')} />
                    <ContentOverlay><p className={styles['optional-text']}>Поле необязательное</p></ContentOverlay>
                </div>
                <div className={styles['checkbox-wrapper']}>
                   <CustomCheckbox content='Сделать мое мероприятие закрытым' {...register('type')}/>
                </div>
				{errors[0] && <ErrorMessage>{errors[0]}</ErrorMessage>}
                <Button type="submit" backgroundColor="#C0A2E2" disabled={!isValid}>Создать мероприятие</Button>
            </Form>
        </div>
    );
};
