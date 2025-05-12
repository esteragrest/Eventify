import { useEffect, useState } from "react";
import { Button } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { selectEventId, selectUserId } from "../../../../selectors";
import { addRatingAsync } from "../../../../actions";
import { request } from "../../../../utils";
import styles from "./rating.module.css";

export const Rating = () => {
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isRated, setIsRated] = useState(false)
  const eventId = useSelector(selectEventId)
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()

	useEffect(() => {
		if (!eventId) return

		Promise.all([
			request(`/api/registrations/registrationForEvent/${eventId}`),
			request(`/api/ratings/userRating/event/${eventId}`)
		])
		.then(([registrationData, ratingData]) => {
			setIsRegistered(registrationData?.isRegistered ?? false);
			setIsRated(ratingData?.isRated ?? false);
		})
		.catch(() => {
			setIsRegistered(false);
			setIsRated(false);
		});
	}, [eventId]);


	const handleClick = (rating) => {
		setSelected(rating)
	};

	const sendRating = () => {
		const ratingData = {
			event_id: eventId,
			user_id: userId,
			rating: selected
		}

		dispatch(addRatingAsync(ratingData))
			.then(() => setIsRated(true))
	}

	if(!isRegistered || isRated) {
		return null;
	}

	return (
			<div className={styles["rating-container"]}>
				<h3>Пожалуйста, оцените мероприятие:</h3>
				<div className={styles.rating}>
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							className={`${styles.star} ${
								star <= (hovered || selected) ? styles.active : ""
							}`}
							onMouseEnter={() => setHovered(star)}
							onMouseLeave={() => setHovered(0)}
							onClick={() => handleClick(star)}
						>
							★
						</span>
					))}
				</div>
				{selected > 0 &&
					<Button backgroundColor='#E0C9FF' onClick={sendRating}>Оставить оценку</Button>
				}
			</div>
	);
};
