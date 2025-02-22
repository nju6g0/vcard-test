import React, { useEffect, useState } from 'react'

import Vcard from './components/Vcard'

function App() {
  const [isScreenshotDetected, setIsScreenshotDetected] = useState(false)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('Document is hidden')
        setIsScreenshotDetected(true)
      } else {
        console.log('Document is visible')
        // setIsScreenshotDetected(false)
      }
    }

    const handleKeyDown = (event) => {
      console.log(event.key)
      if (event.key === 'PrintScreen') {
        console.log('Screenshot detected')
        setIsScreenshotDetected(true)
      }
    }

    // const handleTouchStart = () => {
    //   console.log('Touch event detected')
    // }
    const handleBlur = () => {
      console.log('Window is blurred')
      setIsScreenshotDetected(true)
    }

    const handleFocus = () => {
      console.log('Window is focused')
      setIsScreenshotDetected(false)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('keydown', handleKeyDown)
    // window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('keydown', handleKeyDown)
      // window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  if (isScreenshotDetected) {
    return (
      <div
        style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}
      ></div>
    )
  }

  return <Vcard />
}

export default App
