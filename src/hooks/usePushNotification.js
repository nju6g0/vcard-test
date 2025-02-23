import { useEffect } from 'react'

const usePushNotification = () => {
  // useEffect(() => {
  //   if (Notification.permission !== 'granted') {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === 'granted') {
  //         subscribeUser()
  //       }
  //     })
  //   }
  // }, [])
  const requestPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          subscribeUser()
        }
      })
    } else {
      console.log('Notification permission already granted') // 添加日誌
    }
  }

  const subscribeUser = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        const publicVapidKey = 'YOUR_PUBLIC_VAPID_KEY'
        const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey)
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          })
          .then((subscription) => {
            fetch('/subscribe', {
              method: 'POST',
              body: JSON.stringify(subscription),
              headers: {
                'Content-Type': 'application/json',
              },
            })
          })
      })
    }
  }

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const pushNotification = (message) => {
    console.log(message)
    if (Notification.permission === 'granted') {
      console.log(Notification)
      // new Notification(message)
      new Notification('測試通知', { body: '這是一個測試通知' })
    } else {
      console.log('Notification permission not granted') // 添加日誌
    }
  }

  return { pushNotification, requestPermission }
}

export default usePushNotification
