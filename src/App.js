import React from 'react'
import Vcard from './components/Vcard'
import { Button, Flex } from 'antd'

import useScreenshotDetection from './hooks/useScreenshotDetection'
import usePushNotification from './hooks/usePushNotification'

import './App.css'

function App() {
  const { isScreenshotDetected, eventName } = useScreenshotDetection()
  const { showNotification, requestPermission } = usePushNotification()

  if (isScreenshotDetected) {
    showNotification(eventName)
  }

  return (
    <div>
      <p className="text">{eventName}</p>
      <Button onClick={requestPermission}>Enable Push Notifications</Button>
      <Vcard />
      {isScreenshotDetected && <div className="cover" />}
    </div>
  )
}

export default App
