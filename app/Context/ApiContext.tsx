import { useState, createContext , useContext} from "react";
import type { ApiContextType } from "~/types/api.type.ts";
import type { EventType } from "../types/event.type";
import type { ParticipantType } from "../types/participant.type";
import { NotificationContext } from "./NotificationContext";
export const ApiContext = createContext<ApiContextType | null>(null);

const ApiContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {


  const context = useContext(NotificationContext);
  if (!context) return;
  const { showNotification } = context;


  async function getData(path: string) {
    const baseUrl: string | undefined = import.meta.env.VITE_API_URL;
    if (!baseUrl) return null;

    try {
      const response = await fetch(baseUrl + path);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();

      return result;
    }  catch (error:any) {
      console.error(error);
        showNotification({
          text: "Fail to get data "+error.message,
          style: "error",
        });
    }
  }

  async function createData(path: string, obj: EventType | ParticipantType) {
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
    } catch (error:any) {
      console.error(error);
        showNotification({
          text: "Fail to create data "+error.message,
          style: "error",
        });
    }
  }

  async function editData(path: string, obj: EventType | ParticipantType) {
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
    }  catch (error:any) {
      console.error(error);
        showNotification({
          text: "Fail to edit data "+error.message,
          style: "error",
        });
    }
  }
  async function removeData(path: string) {
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
    } catch (error:any) {
      console.error(error);
        showNotification({
          text: "Fail to remove data "+error.message,
          style: "error",
        });
    }
  }

  return (
    <ApiContext.Provider value={{ removeData, editData, createData, getData }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
