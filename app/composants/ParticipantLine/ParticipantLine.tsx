import type { ParticipantType } from "~/types/participant.type";
import type { EventType } from "~/types/event.type";
import { useState ,useContext  } from "react";
import "./participantLine.css";
import { ApiContext } from "~/Context/ApiContext";


export default function ParticipantLine({
  p,
  context,
  isParticipantOfEvent,
  eventID,
  setEvent,
}: {
  p: ParticipantType;
  context: string;
  isParticipantOfEvent: boolean;
  eventID: string | null;
  setEvent: Function | null;
}) {
  const [participantOFEvent, SetParticipantOFEvent] =
    useState<boolean>(isParticipantOfEvent);

  const contextApi = useContext(ApiContext);
  if (!contextApi) return;
  const { editData,getData } = contextApi;

  async function applyUpdate(data: EventType) {
    try {
      const res = await editData(`events/${data.id}`, data);
      return true;
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      return false;
    }
  }
  async function removeParticipantOfEvent() {
    try {
      const event = await getData("events/" + eventID);
      if (event && event.participantsId.includes(p.id)) {
        event.participantsId = event.participantsId.filter(
          (elt: string) => elt != p.id
        );
        event.participants = event.participants.filter(
          (elt: ParticipantType) => elt.id != p.id
        );

        if (await applyUpdate(event)) {
          SetParticipantOFEvent(false);
          if (setEvent) {
            setEvent(event);
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  }
  async function addParticipantToEvent() {
    try {
      const event = await getData("events/" + eventID);
      if (event && !event.participantsId.includes(p.id)) {
        event.participantsId.push(p.id);
        if (!event.participants) {
          event.participants = [];
        }
        event.participants.push(p);
        if (await applyUpdate(event)) {
          SetParticipantOFEvent(true);
          if (setEvent) {
            setEvent(event);
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  }

  return context === "view" ? (
    <span>
      {p.prenom} {p.nom.toUpperCase()} : {p.mail} - {p.telephone}
    </span>
  ) : (
    <div className="participantLine">
      {participantOFEvent ? (
        <button className="remove" onClick={() => removeParticipantOfEvent()}>
          Enlever
        </button>
      ) : (
        <button className="add" onClick={() => addParticipantToEvent()}>
          Ajouter
        </button>
      )}
      <span>
        {p.prenom} {p.nom.toUpperCase()} : {p.mail} - {p.telephone}
      </span>
    </div>
  );
}
