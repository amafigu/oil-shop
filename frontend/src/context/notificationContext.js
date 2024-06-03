import NotificationCard from "#components/ui/NotificationCard"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { createContext, useContext, useState } from "react"

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const onSetNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
  }

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        onSetNotification,
      }}
    >
      {notification && <NotificationCard message={notification} />}
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => useContext(NotificationContext)
