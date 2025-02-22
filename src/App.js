import React from 'react'
import Vcard from './components/Vcard'
import useScreenshotDetection from './hooks/useScreenshotDetection'
import usePushNotification from './hooks/usePushNotification'

function App() {
  const { isScreenshotDetected, eventName } = useScreenshotDetection()
  // const { showNotification } = usePushNotification()

  if (isScreenshotDetected) {
    // showNotification(eventName)
    return (
      <div
        style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}
      >
        <p style={{ color: '#fff' }}>{eventName}</p>
      </div>
    )
  }

  return (
    <>
      <p>{eventName}</p>
      <Vcard />
    </>
  )
}

export default App
