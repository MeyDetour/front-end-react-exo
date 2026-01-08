import type { EventType } from "~/types/event.type";
import { Link } from "react-router";
import "./eventcard.css";

export default function EventCard({
  event,
  format,
}: {
  event: EventType;
  format: string;
}) {
  return (
    // pas besoin de card on l'utilise nul part ailleur
    <Link
      to={"/event/" + event.id}
      className={(format === "little" ? "little" : "") + " eventCard"}
      key={event.id}
    >
      <img
        src={event.image ? event.image : "images/default.png"}
        alt={event.image.split("/")[2]}
      />
      <div>
        <h2>{event.name}</h2> 
        <span>Le {event.date}</span>

        {format != "little" && (
          <span>
            Etat :{" "}
            {event.status === "incomming"
              ? "A venir"
              : event.status === "progress"
                ? "En cours"
                : "Terminé"}
          </span>
        )}

        <span>Participants : {event.participantsId.length}</span>
        {format != "little" && <p>{event.description}</p>}
      </div>
    </Link>
  );
}
