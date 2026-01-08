 
import type { ParticipantType } from "./participant.type";

export interface EventType {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  participants: ParticipantType[]|null; // Liste des participants inscrits
  participantsId: string[]; // Liste des participants inscrits
  status: "progress"|"incomming"|"done";
  description: string;
}