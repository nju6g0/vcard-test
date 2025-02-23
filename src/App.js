import React, { useState } from 'react'

function App() {
  const [notificationText, setNotificationText] = useState('這是一個測試通知')

  const requestPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('通知權限已獲得')
        } else {
          console.log('通知權限被拒絕')
        }
      })
    } else {
      console.log('通知權限已經獲得')
    }
  }

  const showNotification = () => {
    console.log('showNotification')
    if (Notification.permission === 'granted') {
      console.log('通知權限已獲得')
      try {
        new Notification('測試通知', { body: notificationText })
        console.log('通知已發送')
      } catch (error) {
        console.error('通知發送失敗:', error)
      }
    } else {
      console.log('通知權限未獲得')
    }
  }

  return (
    <div>
      <button type="button" onClick={requestPermission}>
        Enable Push Notifications
      </button>
      <button type="button" onClick={showNotification}>
        Show Notification
      </button>
    </div>
  )
}

export default App
