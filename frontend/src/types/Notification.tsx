export interface NotificationContextType {
  setNotification: (message: string | null) => void
  onSetNotification: (message: string) => void
}

export interface ValidationErrorsCardProps {
  errorsArray: { message: string; path: string }[]
  translationObj: { [key: string]: { [key: string]: string } }
}
