 
import { useState, useEffect , useContext} from "react"; 
import type { ParticipantType } from "~/types/participant.type";
import { NotificationContext } from "~/Context/NotificationContext";
import { ApiContext } from "~/Context/ApiContext";
import { v4 as uuidv4 } from "uuid";

export default function ParticipantForm({
  participant = null,
  participants,
  setParticipants,
}: {
  participant: ParticipantType | null;
  participants: ParticipantType[];
  setParticipants: Function;
}) {
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    mail: "",
    telephone: "",
  });

  const context = useContext(NotificationContext);
  if (!context) return;
  const { showNotification } = context;



  const contextApi = useContext(ApiContext);
  if (!contextApi) return;
  const { editData,createData } = contextApi;

  useEffect(() => {
    if (participant) {
      setForm({
        prenom: participant.prenom,
        nom: participant.nom,
        mail: participant.mail,
        telephone: participant.telephone,
      });
    }
  }, [participant]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const target = e.target as typeof e.target & {
        nom: { value: string };
        prenom: { value: string };
        mail: { value: string };
        telephone: { value: string };
      };
      if (!target.nom) {
        setError("please enter name.");
        return;
      }
      if (!target.prenom) {
        setError("please enter first name");
        return;
      }
      if (!target.mail) {
        setError("please enter mail");
        return;
      }
      if (!target.telephone) {
        setError("please enter phone number");
        return;
      }
      const nom = target.nom.value;
      const prenom = target.prenom.value;
      const mail = target.mail.value;
      const telephone = target.telephone.value;

      if (participant) {
        const newP = {
          nom: nom,
          prenom: prenom,
          mail: mail,
          telephone: telephone,
          id: participant.id,
        };
        const res = await editData("participants/" + participant.id, newP);

        showNotification({
          text: "Participant modifié",
          style: "success",
        });
        setParticipants((prev: ParticipantType[]) =>
          prev.map((p) => (p.id === newP.id ? newP : p))
        );
        return;
      }
      const newP = {
        nom: nom,
        prenom: prenom,
        mail: mail,
        telephone: telephone,
        id: uuidv4(),
      };
      const res = await createData("participants", newP);
       showNotification({
          text: "Participant created",
          style: "success",
        });

      setParticipants((prev: ParticipantType[]) => [...prev, newP]);
    } catch (error: any) {
      setError("Erreur lors de la récupération :" + error.message);
    }
  }
  return (
    <form className="" onSubmit={handleSubmit}>
      <div>
        <label>First name:</label>
        <input
          type="text"
          name="prenom"
          value={form.prenom}
          onChange={(e) => setForm({ ...form, prenom: e.target.value })}
        />
      </div>
      <div>
        <label>Last name:</label>{" "}
        <input
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          type="text"
          name="nom"
        />
      </div>
      <div>
        <label>Mail:</label>{" "}
        <input
          value={form.mail}
          onChange={(e) => setForm({ ...form, mail: e.target.value })}
          type="text"
          name="mail"
        />
      </div>
      <div>
        <label>Phone number:</label>
        <input
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          type="text"
          name="telephone"
        />
      </div>
      {error && <p>{error}</p>}
      <div>
        <input type="submit" value={participant ? "Modifier" : "Créer"} />
      </div>
    </form>
  );
}
