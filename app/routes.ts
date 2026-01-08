import { type RouteConfig, index ,route} from "@react-router/dev/routes";
 

export default [
  index( "./pages/Stats/Stats.tsx"),  
  route("participants", "./pages/Participants/Participants.tsx"),
  route("events", "./pages/Events/Events.tsx"),  
  route("event/:id", "./pages/EventDetail/EventDetail.tsx"),  
  route("new/event", "./pages/NewEvent/NewEvent.tsx"),  
  route("edit/event/:id", "./pages/EditEvent/EditEvent.tsx"),  
] satisfies RouteConfig;