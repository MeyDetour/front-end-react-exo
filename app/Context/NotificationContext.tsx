import { useState, createContext } from "react";
import type {
  NotificationType,
  NotificationContextType,
} from "~/types/notification.type";

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, SetNotification] = useState<NotificationType | null>(
    null
  );
  function showNotification(obj: NotificationType) {
    SetNotification(obj);
  }
  function removeNotification() {
    SetNotification(null);
  }
  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, removeNotification }}
    >
      {
        notification &&
        <div className="toast">
         <span>{notification.text}</span> 
         <button onClick={removeNotification}>X</button>
        </div>
      }

      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
