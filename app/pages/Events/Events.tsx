import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router";
import "./events.css";
import type { EventType } from "~/types/event.type";
import EventCard from "~/composants/EventCard/EventCard";
import { ApiContext } from "~/Context/ApiContext";

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);

  const selectRef = useRef(null);
  const searchRef = useRef(null);

  const contextApi = useContext(ApiContext);
  if (!contextApi) return;
  const { getData } = contextApi;

  async function fetchEvent(path: string) {
    try {
      const res = await getData(path);
      setEvents(res);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  }

  useEffect(() => {
    fetchEvent("events");
  }, []);

  function changeStatutFilter() {
    if (selectRef.current) {
      const selectedValue = selectRef.current.value;

      fetchEvent(
        "events" + (selectedValue !== "all" ? "?status=" + selectedValue : "")
      );
    }
  }
  function search(event: React.FormEvent) {
    event.preventDefault();

    if (searchRef.current) {
      const searchValue = searchRef.current.value;

      if (searchValue === "") {
        fetchEvent("events");
        return;
      }

      setEvents((prev) =>
        prev.filter((elt) =>
          elt.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }

  return (
    <div className="eventsPage">
      <h1>Events</h1>

      <div className="filtrers">
        <Link className="newButton" to="/new/event">
          New Event
        </Link>
        <select
          ref={selectRef}
          onChange={() => changeStatutFilter()}
          name="pets"
          id="pet-select"
        >
          <option defaultChecked value="all">
            Tous les statuts
          </option>
          <option value="incomming">A venir</option>
          <option value="progress">En cours</option>
          <option value="done">Terminé</option>
        </select>

        <form onSubmit={search}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Rechercher un événement..."
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="wrapper">
        {events && events.map((event) => <EventCard format={"big"} event={event} />)}
      </div>
    </div>
  );
}
