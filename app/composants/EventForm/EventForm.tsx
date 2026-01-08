import type { FormEventHandler } from "react";
import type {EventType} from "~/types/event.type"
import "./eventForm.css"
export default function EventForm({handleSubmit,error,event=null}:{handleSubmit:FormEventHandler,error:string|null,event:EventType|null}) {
  
    return   <form className=""  onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input defaultValue={event? event.name : "Event name"} type="text" name="name" />
        </div>
        <div>
          <label>Date:</label> <input  defaultValue={event? event.date : Date().split('T')[0]} type="date" name="date" />
        </div> 
        <div>
          <label>Location:</label> <input  defaultValue={event? event.location : "Paris"} type="text" name="location" />
        </div>
        <div>
          <label>Description:</label> 
          <textarea id="description" defaultValue={event? event.description : "Your description"} name="description" rows="5" cols="33">
          </textarea>
        </div>
        {error && <p>{error}</p>}
        <div>
          <input type="submit" value={event ? "Modifier":"Créer"} />
        </div>
      </form>
}