import type { EventType } from "./event.type";
import type { ParticipantType } from "./participant.type";


 
export type ApiContextType = { 
  getData: (path:string) =>  Promise<any>;
  createData: (path:string,obj:EventType | ParticipantType) =>  Promise<any>;
  editData: (path:string,obj:EventType | ParticipantType) =>  Promise<any>; 
  removeData: (path:string) =>  Promise<any>;
};