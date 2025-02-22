import React, { useEffect, useState } from 'react'

import Vcard from './components/Vcard'

function App() {
  const [isScreenshotDetected, setIsScreenshotDetected] = useState(false)
  const [eventName, setEventName] = useState('')

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setEventName('Document is hidden')
        setIsScreenshotDetected(true)
      } else {
        setEventName('Document is visible')
        // setIsScreenshotDetected(false)
      }
    }

    // const handleKeyDown = (event) => {
    //   console.log(event.key)
    //   if (event.key === 'PrintScreen') {
    //     console.log('Screenshot detected')
    //     setIsScreenshotDetected(true)
    //   }
    // }

    // const handleTouchStart = () => {
    //   console.log('Touch event detected')
    // }
    const handleBlur = () => {
      setEventName('Window is blurred')
      setIsScreenshotDetected(true)
    }

    const handleFocus = () => {
      setEventName('Window is focused')
      // setIsScreenshotDetected(false)
    }

    const handlePageHide = () => {
      setEventName('Page is hidden')
      setIsScreenshotDetected(true)
    }

    const handlePageShow = () => {
      setEventName('Page is visible')
      // setIsScreenshotDetected(false)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    // window.addEventListener('keydown', handleKeyDown)
    // window.addEventListener('touchstart', handleTouchStart)
    // window.addEventListener('blur', handleBlur)
    // window.addEventListener('focus', handleFocus)
    // window.addEventListener('pagehide', handlePageHide)
    // window.addEventListener('pageshow', handlePageShow)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      // window.removeEventListener('keydown', handleKeyDown)
      // window.removeEventListener('touchstart', handleTouchStart)
      // window.removeEventListener('blur', handleBlur)
      // window.removeEventListener('focus', handleFocus)
      // window.removeEventListener('pagehide', handlePageHide)
      // window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  if (isScreenshotDetected) {
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
