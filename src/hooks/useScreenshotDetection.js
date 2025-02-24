import { useEffect, useState } from 'react'

const useScreenshotDetection = () => {
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

    const handleKeyDown = (event) => {
      setIsScreenshotDetected(false)
    }

    const handleTouchStart = () => {
      setEventName('Touch event detected')
      setIsScreenshotDetected(false)
    }

    const handleMouseDown = () => {
      setEventName('Mouse event detected')
      setIsScreenshotDetected(false)
    }

    const handleBlur = () => {
      setEventName('Window is blurred')
      setIsScreenshotDetected(true)
    }

    const handleFocus = () => {
      setEventName('Window is focused')
      setIsScreenshotDetected(false)
    }

    const handlePageHide = () => {
      setEventName('Page is hidden')
      setIsScreenshotDetected(true)
    }

    const handlePageShow = () => {
      setEventName('Page is visible')
      setIsScreenshotDetected(false)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('blur', handleBlur)
    // window.addEventListener('focus', handleFocus)
    // window.addEventListener('pagehide', handlePageHide)
    // window.addEventListener('pageshow', handlePageShow)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('blur', handleBlur)
      // window.removeEventListener('focus', handleFocus)
      // window.removeEventListener('pagehide', handlePageHide)
      // window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return { isScreenshotDetected, eventName }
}

export default useScreenshotDetection
