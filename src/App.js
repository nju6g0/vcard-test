import React, { useState, useEffect } from 'react'
import Vcard from './components/Vcard'
import { Button, Flex } from 'antd'

import useScreenshotDetection from './hooks/useScreenshotDetection'
import usePushNotification from './hooks/usePushNotification'
// import { messaging } from './firebase'

import './App.css'

function App() {
  const { isScreenshotDetected, eventName } = useScreenshotDetection()
  const { pushNotification, requestPermission } = usePushNotification()
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

  // useEffect(() => {
  //   window.addEventListener('pagehide', handlePageHide)
  //   window.addEventListener('pageshow', handlePageShow)
  //   return () => {
  //     window.removeEventListener('pagehide', handlePageHide)
  //     window.removeEventListener('pageshow', handlePageShow)
  //   }
  // }, [])

  // useEffect(() => {
  //   messaging
  //     .requestPermission()
  //     .then(() => {
  //       return messaging.getToken()
  //     })
  //     .then((token) => {
  //       console.log('Token:', token)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  // }, [])

  return (
    <div>
      {/* <p className="text">{eventName}</p> */}
      <button type="button" onClick={requestPermission}>
        Enable Push Notifications
      </button>
      <button
        type="button"
        onClick={() => {
          // console.log(showNotification)
          pushNotification('這是一個測試')
        }}
      >
        show notification
      </button>
      <Vcard />
      {/* {isScreenshotDetected && <div className="cover" />} */}
    </div>
  )
}

export default App
