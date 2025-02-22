import { useEffect } from 'react'

const usePushNotification = () => {
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          subscribeUser()
        }
      })
    }
  }, [])

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

  const showNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification(message)
    }
  }

  return { showNotification }
}

export default usePushNotification
