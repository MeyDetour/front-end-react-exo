import "./participants.css";
import { useEffect, useState  , useContext} from "react";
import type { ParticipantType } from "~/types/participant.type";
import ParticipantLine from "~/composants/ParticipantLine/ParticipantLine";
import ParticipantForm from "../../composants/ParticipantForm/ParticipantForm";
import { getData, removeData, editData } from "../../api/api";
import { NotificationContext } from "~/Context/NotificationContext";


export default function Participants() {
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [participantToEdit, setPartitipantToEdit] =
    useState<ParticipantType | null>(null);

  const context = useContext(NotificationContext);
  if (!context) return;
  const { showNotification } = context;
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await getData("participants");
        setParticipants(res);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };

    fetchParticipants();
  }, []);
  async function removeParticipant(id: string) {
    try {
      const participants = await removeData("participants/" + id);
      setParticipants((prev) => prev.filter((p) => p.id != id));
      const events = await getData("events");
        showNotification({
          text: "Participant removed",
          style: "success",
        });
      for (let e of events) {
        if (e.participantsId.includes(id)) {
          e.participantsId = e.participantsId.filter((elt) => elt != id);
          await editData(`events/${e.id}`, e);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
  if (!participants) return <p>Loading....</p>;
  return (
    <div className="participantsPage">
      <h1>Participants</h1>
      <div className="content">
        <div className="participants-wrapper">
          {participants.map((p) => (
            <div key={p.id}>
              <button onClick={() => setPartitipantToEdit(p)}>Edit</button>
              <button onClick={() => removeParticipant(p.id)}>Remove</button>
              <ParticipantLine
                p={p}
                context="view"
                isParticipantOfEvent={false}
                eventID={null}
                setEvent={null}
              />
            </div>
          ))}
        </div>

        <div className="form-container">
          <h2>Add participant</h2>

          <ParticipantForm
            participant={participantToEdit}
            setParticipants={setParticipants}
            participants={participants}
          />
        </div>
      </div>
    </div>
  );
}
