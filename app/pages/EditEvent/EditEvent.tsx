import { useEffect, useState , useContext} from "react";
import { useNavigate, useParams } from "react-router";
import { editData, getData } from "../../api/api";
import type { EventType } from "~/types/event.type";
import "./editEvent.css";
import EventForm from "../../composants/EventForm/EventForm";
import ParticipantLine from "~/composants/ParticipantLine/ParticipantLine";
import type { ParticipantType } from "~/types/participant.type";
import { NotificationContext } from "~/Context/NotificationContext";

export default function EditEvent() {
  const { id } = useParams<string>();
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<EventType | null>(null);
  const [participants, setParticipants] = useState<ParticipantType[] | null>(
    null
  );
  const context = useContext(NotificationContext);
  if (!context) return;
  const { showNotification } = context;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getData("events/" + id);
        if (res) {
          res.participants = [];
          for (let idP of res.participantsId) {
            const participant = await getData("participants/" + idP);
            if (participant) {
              res.participants.push(participant);
            }
          }
          setEvent(res);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };
    const fetchParticipants = async () => {
      try {
        const res = await getData("participants");
        setParticipants(res);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };

    if (id) {
      fetchEvent();
      fetchParticipants();
    }
  }, [id]);

  async function fetchData(path: string, data: EventType) {
    try {
      const res = await editData(`${path}/${data.id}`, data);
      if (res && res.id) {
        navigate("/event/" + res.id);
        showNotification({
          text: "Event edited",
          style: "success",
        });
        return;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  }

  function handleSubmit(e: React.SyntheticEvent) {
    if (!event) return;
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

      fetchData("events", {
        name: name,
        location: location,
        description: description,
        date: date.toString(),
        image: "",
        participantsId: [],
        status: "incomming",
        participants: null,
        id: event.id,
      });
    } catch (error: any) {
      setError("Erreur lors de la récupération :" + error.message);
    }
  }
  if (!event) {
    return null;
  }
  return (
    <div className="editEventPage">
      <EventForm handleSubmit={handleSubmit} error={error} event={event} />
      <div className="participantsWrapper">
        {event.participants && (
          <>
            <h2>Participants</h2>
            {event.participants.map((p) => (
              <ParticipantLine
                key={p.id} 
                p={p}
                context="edit"
                isParticipantOfEvent={true}
                eventID={event.id}
                setEvent={setEvent}
              />
            ))}
          </>
        )}
        {participants && (
          <>
            <h2>Non participants</h2>
            {participants.map((p) =>
              event.participantsId.includes(p.id) ? (
                ""
              ) : (
                <ParticipantLine
                  key={p.id}
                  p={p}
                  context="edit"
                  isParticipantOfEvent={false}
                  eventID={event.id}
                  setEvent={setEvent}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
