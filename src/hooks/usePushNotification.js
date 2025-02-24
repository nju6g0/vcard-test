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
  const isPushNotificationSupported = () => {
    return 'serviceWorker' in navigator && 'PushManager' in window
  }

  const requestPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          subscribeUser()
          console.log('通知權限已獲得')
        }
      })
    } else {
      console.log('Notification permission already granted') // 添加日誌
    }
  }

  const subscribeUser = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        const publicVapidKey =
          'BLCVYzOCnYdXnaPdB9C0peTBjtd-BakzqQTGOL5zNA7Q2HZDMuzomhvhcsb3L_0Qczpm6sp2R-eEVGpzaroeZMw'
        const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey)
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          })
          .then((subscription) => {
            // fetch('/subscribe', {
            //   method: 'POST',
            //   body: JSON.stringify(subscription),
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            // })
            console.log('推送訂閱資訊:', JSON.stringify(subscription))
          })
          .catch((error) => {
            console.error('推送訂閱失敗:', error)
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
      // console.log(Notification)
      try {
        new Notification('測試通知', { body: message })
        console.log('通知已發送')
      } catch (error) {
        console.error('通知發送失敗:', error)
      }
    } else {
      console.log('Notification permission not granted') // 添加日誌
    }
  }

  return { pushNotification, requestPermission, isPushNotificationSupported }
}

export default usePushNotification
