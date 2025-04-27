import { useSelector } from "react-redux";
import { selectEventId } from "../../../../selectors";
import { useEffect, useState } from "react";
import { request } from "../../../../utils";
import { Button } from "../../../../components";
import { ParticipantItem } from "./participant-item/ParticipantItem";
import styles from "./list-of-participants.module.css";

export const ListOfParticipants = () => {
  const [registrations, setRegistrations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const eventId = useSelector(selectEventId);

  useEffect(() => {
    request(`/api/registrations/event/${eventId}`).then((registrations) => {
      setRegistrations(registrations);
    });
  }, [eventId]);

  const showListOfParticipants = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["registrations-list-container"]}>
      {registrations.length === 0 ? (
        <h4>На это мероприятие ещё никто не зарегистрировался!</h4>
      ) : (
        <>
          <Button backgroundColor="#E8FF59" onClick={showListOfParticipants}>
            {isOpen ? "Скрыть участников" : "Посмотреть участников"}
          </Button>
          {isOpen && (
            <div className={styles.registrations}>
              {registrations.map((registration) => (
                <ParticipantItem key={registration.id} registration={registration} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
