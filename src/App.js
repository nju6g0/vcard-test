import React, { useState, useEffect } from 'react'
import Vcard from './components/Vcard'
import { Button, Input } from 'antd'

import useScreenshotDetection from './hooks/useScreenshotDetection'
import usePushNotification from './hooks/usePushNotification'

import './App.css'

function App() {
  const { isScreenshotDetected, eventName } = useScreenshotDetection()
  const { pushNotification, requestPermission, isPushNotificationSupported } =
    usePushNotification()
  const [notificationText, setNotificationText] = useState('測試')

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
      <p>
        Push Notification are {!isPushNotificationSupported() && 'NOT'}{' '}
        supported by your device
      </p>
      <Button
        disabled={!isPushNotificationSupported()}
        onClick={requestPermission}
      >
        Enable Push Notifications
      </Button>
      <Button
        disabled={!isPushNotificationSupported()}
        onClick={() => {
          // console.log(showNotification)
          pushNotification(notificationText)
        }}
      >
        show notification
      </Button>
      <Input
        value={notificationText}
        onChange={(e) => {
          setNotificationText(e.target.value)
        }}
      />
      <Vcard />
      {isScreenshotDetected && <div className="cover" />}
    </div>
  )
}

export default App
