

export interface NotificationType {
  text:string,
  style:string
}
export type NotificationContextType = {
  notification: NotificationType|null;
  showNotification: (obj: NotificationType) => void;
  removeNotification: () => void;
};