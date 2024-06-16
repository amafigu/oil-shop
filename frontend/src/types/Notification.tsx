export interface NotificationContextType {
  setNotification: (message: string | null) => void
  onSetNotification: (message: string) => void
}
