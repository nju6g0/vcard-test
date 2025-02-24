import React, { useState, useEffect } from 'react'
import Vcard from './components/Vcard'
import { Button, Flex } from 'antd'

import useScreenshotDetection from './hooks/useScreenshotDetection'
import usePushNotification from './hooks/usePushNotification'

import './App.css'

function App() {
  const { isScreenshotDetected, eventName } = useScreenshotDetection()
  const { pushNotification, requestPermission, isPushNotificationSupported } = usePushNotification()
  const [notificationText, setNotificationText] = useState('測試')
  const [isSupported, setIsSupported] = useState(false);

  // if (isScreenshotDetected) {
  //   pushNotification(eventName)
  // }

  const handlePageHide = () => {
    setNotificationText('Page is hidden')
    pushNotification('Page is hidden')
  }
  const handlePageShow = () => {
    setNotificationText('Page is visible')
  }

useEffect(() => {
  if("serviceWorker" in navigator && "PushManager" in window){
    setIsSupported(true);
  }
  console.log(isPushNotificationSupported())
}, [isPushNotificationSupported])
  // useEffect(() => {
  //   pushNotification(notificationText)
  // }, [notificationText, pushNotification])

  useEffect(() => {
    window.addEventListener('pagehide', handlePageHide)
    window.addEventListener('pageshow', handlePageShow)
    return () => {
      window.removeEventListener('pagehide', handlePageHide)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <div>
      {/* <p className="text">{eventName}</p> */}
      <p>{"serviceWorker" in navigator && "PushManager" in window ? 'true': 'false'}</p>
      <p>{isPushNotificationSupported()? 'true': 'false'}</p>
      <p>Push Notification are {!isSupported && 'NOT'} supported by your device</p>
      <p>Push Notification are {!isPushNotificationSupported() && 'NOT'} supported by your device</p>
      <Button onClick={requestPermission}>Enable Push Notifications</Button>
      <Button
        onClick={() => {
          // console.log(showNotification)
          pushNotification('這是一個測試')
        }}
      >
        show notification
      </Button>
      <Vcard />
      {/* {isScreenshotDetected && <div className="cover" />} */}
    </div>
  )
}

export default App
