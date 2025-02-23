import React from 'react'
import Vcard from './components/Vcard'
import useScreenshotDetection from './hooks/useScreenshotDetection'
import usePushNotification from './hooks/usePushNotification'

import './App.css'

function App() {
  const { isScreenshotDetected, eventName } = useScreenshotDetection()
  // const { showNotification } = usePushNotification()

  return (
    <div>
      <p className="text">{eventName}</p>
      <Vcard />
      {isScreenshotDetected && <div className="cover" />}
    </div>
  )
}

export default App
