import { NotificationCard } from "@/components/ui/NotificationCard"
import { MESSAGE_TIMEOUT } from "@/constants/time"
import { NotificationContextType } from "@/types/Notification"
import { ReactNode, createContext, useContext, useState } from "react"

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<string | null>(null)

  const onSetNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), MESSAGE_TIMEOUT)
  }

  return (
    <NotificationContext.Provider
      value={{
        setNotification,
        onSetNotification,
      }}
    >
      {children}
      {notification && <NotificationCard message={notification} />}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    console.error("can not access useNotificationContext")
    throw new Error(
      "useNotificationContext should be accessible through a NotificationProvider",
    )
  }
  return context
}
