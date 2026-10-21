import { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState('')

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

// Hook para leer el texto de la notificación
export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[0]
}

// Hook para disparar la notificación
export const useNotify = () => {
  const valueAndDispatch = useContext(NotificationContext)
  const setNotification = valueAndDispatch[1]

  return (payload) => {
    setNotification(payload)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }
}

export default NotificationContext