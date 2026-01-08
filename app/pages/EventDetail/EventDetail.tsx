import { useParams, Link, useNavigate 
} from "react-router";
import { useEffect, useState , useContext } from "react";
import type { EventType } from "~/types/event.type"; 
import "./eventDetail.css";
import ParticipantLine from "~/composants/ParticipantLine/ParticipantLine";
import { NotificationContext } from "~/Context/NotificationContext";
import { ApiContext } from "~/Context/ApiContext";


export default function EventDetail() {
  const { id } = useParams<string>();
  const [event, setEvent] = useState<EventType | null>(null);
  const navigate = useNavigate();

  const context = useContext(NotificationContext);
  if (!context) return;
  const { showNotification } = context;


  const contextApi = useContext(ApiContext);
  if (!contextApi) return;
  const { getData ,removeData } = contextApi;

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

    if (id) {
      fetchEvent();
    }
  }, []);

  async function removeEvent() {
    try {
      const res = await removeData("events/" + id);
      navigate("/events");
          showNotification({
          text: "Event deleted",
          style: "success",
        });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }

  if (!event) {
    return null;
  }
  return (
    <div className="eventDetailPage">
     
        <img src={ event.image?event.image : "/images/default.png"} alt={event.image.split("/")[2]} />
      

      <div>
        <h2>{event.name}</h2>
        <div className="separator"></div>
        <span>Le {event.date}</span>
        <span>
          Etat :{" "}
          {event.status === "incomming"
            ? "A venir"
            : event.status === "progress"
              ? "En cours"
              : "Terminé"}
        </span>
        <span>Participants : {event.participantsId.length}</span>
        <p>{event.description}</p>

        {event.participants && event.participants.length > 0 && (
          <>
            <h3>Participants</h3>
            {event.participants.map((p, index) => (
              <ParticipantLine p={p} key={p.id} isParticipantOfEvent={true} context="view" eventID={null} setEvent={null}/>
            ))}
          </>
        )}

        <div className="buttonContainer">
          <Link className="editButton" to={"/edit/event/" + event.id}>
            Edit
          </Link>
          <button className="removeButton" onClick={removeEvent}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
