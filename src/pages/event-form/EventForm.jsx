import styles from './event-form.module.css';
import {
		Button,
		ContentOverlay,
		DateTimeInput,
		FileInput,
		Form,
		FormRow,
		Input,
		Textarea,
		TitleForm
} from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

const eventSchema = yup.object().shape({
	file: yup
        .mixed()
        .required("Фото обязательно")
        .test("fileType", "Файл должен быть изображением (jpg, png)", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/png"].includes(value.type);
        }),
})

export const EventForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors}
	} = useForm({ defaultValues:{
		file: ''
	},
	resolver: yupResolver(eventSchema)
	})

    return (
        <div className={styles['event-form-container']}>
            <TitleForm>Создайте свое мероприятие!</TitleForm>
            <Form>
                <FileInput register={register} setValue={setValue}/>
                <Input type="text" name="event_title" id="event_title" placeholder="Название Вашего мероприятия" />
                <FormRow>
                    <DateTimeInput type="date" name="event_date" id="event_date" />
                    <DateTimeInput type="time" name="event_time" id="event_time" width="50%" />
                </FormRow>
                <Input type="text" name="event_address" id="event_address" placeholder="Полный адрес Вашего мероприятия" />
                <Textarea name="event_description" id="event_description" placeholder="Опишите Ваше мероприятие" />
                <div className={styles['input-wrapper']}>
                    <Input type="number" name="participants" id="participants" placeholder="Максимальное количество участников" />
                    <ContentOverlay><p className={styles['optional-text']}>Поле необязательное</p></ContentOverlay>
                </div>
                <div className={styles['checkbox-wrapper']}>
                    <input type="checkbox" name="closed_event" id="closed_event" />
                    <label htmlFor="closed_event">Сделать мое мероприятие закрытым</label>
                </div>
                <Button backgroundColor="#C0A2E2">Создать мероприятие</Button>
            </Form>
        </div>
    );
};
