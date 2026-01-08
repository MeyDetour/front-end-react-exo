import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { createData } from "../../api/api";
import type { EventType } from "~/types/event.type";
import { v4 as uuidv4 } from "uuid";
import "./newEvent.css";
import EventForm from "../../composants/EventForm/EventForm"; 
import { NotificationContext } from "~/Context/NotificationContext";

export default function NewEvent() {
  const [error, setError] = useState<string | null>(null);
  const context = useContext(NotificationContext);
  if (!context) return;
  const { showNotification } = context;
  const navigate = useNavigate();
  async function createEvent(path: string, data: EventType) {
    try {
      const res = await createData(path, data);

      if (res && res.id) {
        showNotification({
          text: "Event created",
          style: "success",
        });
        navigate("/event/" + res.id);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const target = e.target as typeof e.target & {
        name: { value: string };
        location: { value: string };
        desctiption: { value: string };
        date: { value: Date };
      };

      const name = target.name.value;
      const location = target.location.value;
      const description = target.description.value;
      const date = target.date.value;
      if (!name) {
        setError("please enter name.");
        return;
      }
      if (!location) {
        setError("please enter location");
        return;
      }
      if (!description) {
        setError("please enter description");
        return;
      }
      if (!date) {
        setError("please enter date");
        return;
      }

      createEvent("events", {
        name: name,
        location: location,
        description: description,
        date: date.toString(),
        image: "",
        participantsId: [],
        status: "incomming",
        participants: null,
        id: uuidv4(),
      });
    } catch (error: any) {
      setError("Erreur lors de la récupération :" + error.message);
    }
  }

  return (
    <div className="newEventPage">
      <EventForm handleSubmit={handleSubmit} error={error} event={null} />
    </div>
  );
}
