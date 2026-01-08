import "./stats.css";
import { useEffect, useState } from "react";
import type { EventType } from "~/types/event.type";
import { getData } from "~/api/api";
import EventCard from "../../composants/EventCard/EventCard";

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [incommingEvent, setIncommingEvent] = useState<EventType[]>([]);
  const [averageParticipant, setAverageParticipant] = useState<number>(0);
  const [eventMostPopular, setEventMostPopular] = useState<EventType | null>(
    null
  );
  async function fetchEvent(path: string) {
    try {
      const eventsData = await getData(path);
      setEvents(eventsData);

      let loadNewIncommingEvents = []; // to load incomming events
      let participantPerEvent = []; // to calcul average
      let mostPopular = eventsData ? eventsData[0] : null; // to get most popular event
      for (let event of eventsData) {
        if (event.status === "incomming") {
          // load incomming events
          loadNewIncommingEvents.push(event);
        }
        let participantCount = event.participantsId.length;

        participantPerEvent.push(participantCount); // to calcul average
        if (participantCount > mostPopular.participantsId.length) {
          mostPopular = participantCount;
        } //  to get most popular event
      }

      loadNewIncommingEvents.sort(compare); // to load incomming events
      setIncommingEvent(loadNewIncommingEvents); // load incomming events
      setEventMostPopular(mostPopular); //  to get most popular event

      // calcul average
      setAverageParticipant(getAverage(participantPerEvent));
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  }

  useEffect(() => {
    fetchEvent("events");
  }, []);

  return (
    <div className="statsPage">
      <h1>Dashboard</h1>
      <div className="firstLine">
        {events && (
          <div className="containerStat">
            <p> Total Events : {events.length}</p>
          </div>
        )}
        {averageParticipant >= 0 && (
          <div className="containerStat">
            <p>
              Participation moyenne par evenement :{" "}
              {Math.round(averageParticipant)}
            </p>
          </div>
        )}
      </div>
      {eventMostPopular && (
        <div className="containerStat">
          <p>Evenement le plus populaire : </p>
          <EventCard event={eventMostPopular} format={"little"} />
        </div>
      )}
      <div className="containerStat">
        <h4>Event to come : {incommingEvent.length}</h4>
        {incommingEvent.map((e: EventType) => (
          <EventCard event={e} format={"little"} />
        ))}
      </div>
    </div>
  );
}

function compare(a: EventType, b: EventType) {
  const dateA = new Date(a.date).getTime();
  const dateB = new Date(b.date).getTime();
  return dateA - dateB;
}
function getAverage(array: number[]) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}
