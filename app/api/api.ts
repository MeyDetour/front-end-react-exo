import type { EventType } from "~/types/event.type";
import type { ParticipantType } from "~/types/participant.type";

export async function getData(path: string) {
  const baseUrl: string | undefined = import.meta.env.VITE_API_URL;
  if (!baseUrl) return null;

  try {
    const response = await fetch(baseUrl + path);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function createData(
  path: string,
  obj: EventType | ParticipantType
) {
  const baseUrl: string | undefined = import.meta.env.VITE_API_URL;
  if (!baseUrl) return null;
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function editData(path: string, obj: EventType | ParticipantType) {
  const baseUrl: string | undefined = import.meta.env.VITE_API_URL;
  if (!baseUrl) return null;
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la modification");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
export async function removeData(path: string) {
  const baseUrl: string | undefined = import.meta.env.VITE_API_URL;
  if (!baseUrl) return null;
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
