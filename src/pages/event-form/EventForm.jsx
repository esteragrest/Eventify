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

const eventSchema = yup.object().shape({
    file: yup
        .mixed()
        .required("Фото обязательно")
        .test("fileType", "Файл должен быть изображением (jpg, jpeg, png)", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
    eventTitle: yup
        .string()
        .required("Название мероприятия обязательно")
        .min(3, "Название должно содержать минимум 3 символа")
        .max(50, "Название должно содержать не более 50 символов"),
    eventDescription: yup
        .string()
        .required("Описание мероприятия обязательно")
        .max(500, "Описание не должно превышать 500 символов"),
    ageLimit: yup
        .string()
        .required("Возрастное ограничение обязательно")
        .oneOf(["no_limit", "14+", "16+", "18+"], "Недопустимое значение возрастного ограничения"),
	payment: yup
        .string()
        .required("Тип оплаты обязателен")
        .oneOf(["free", "paid"], "Недопустимое значение типа оплаты"),
	eventDate: yup
        .string()
        .required("Дата обязательна")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Дата должна быть в формате YYYY-MM-DD")
        .test("isValidDate", "Дата не может быть меньше текущей", (value) => {
            if (!value) return false;
            return new Date(value) >= new Date();
        }),
    eventTime: yup
        .string()
        .required("Время обязательно"),
    address: yup
        .string()
        .required("Адрес обязателен"),
	type: yup.boolean(),
	participants: yup.number()
			.transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
			.min(1, 'Минимальное количество участников — 1')
			.max(100, 'Максимальное количество участников — 100')
});


export const EventForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isValid}
	} = useForm({ defaultValues:{
		file: '',
		eventTitle: '',
		eventDescription: '',
		eventDate: '',
		eventTime: '',
		ageLimit: '',
		payment: '',
		address: '',
		type: false,
		participants: ''
	},
	resolver: yupResolver(eventSchema)
	})

	const onSubmit = (data) => {
		console.log(data)
	}

    return (
        <div className={styles['event-form-container']}>
            <TitleForm>Создайте свое мероприятие!</TitleForm>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput register={register} setValue={setValue}/>
                <Input type="text" name="event_title" id="event_title" placeholder="Название Вашего мероприятия" {...register('eventTitle')} />
                <FormRow>
                    <DateTimeInput type="date" name="event_date" id="event_date" {...register('eventDate')} />
                    <DateTimeInput type="time" name="event_time" id="event_time" {...register('eventTime')} />
                </FormRow>
                <Input type="text" name="event_address" id="event_address" placeholder="Полный адрес Вашего мероприятия" {...register('address')} />
                <Textarea name="event_description" id="event_description" placeholder="Опишите Ваше мероприятие" {...register('eventDescription')} />
				<FormRow>
					<SelectableMenu setValue={(value) => setValue('payment', value)} title='Тип оплаты' options={PAYMENT_TYPE} />
					<SelectableMenu setValue={(value) => setValue('ageLimit', value)} title='Возрастное ограничение' options={AGE_LIMIT_TYPE} />
				</FormRow>
                <div className={styles['input-wrapper']}>
                    <Input type="number" name="participants" id="participants" placeholder="Максимальное количество участников" {...register('participants')} />
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
