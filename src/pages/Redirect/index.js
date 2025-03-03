import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import ProfileCard from '../../components/ProfileCard'

const TIMEOUT = 10 // 10 minutes

const Redirect = () => {
  const { shortCode } = useParams()
  const navigate = useNavigate()
  const secretKey = process.env.REACT_APP_SECRET_KEY
  const decodedShortCode = atob(shortCode).replace(secretKey, '')
  const [isLoading, setIsLoading] = useState(true)

  const handleClick = () => {
    Cookies.remove(shortCode)
  }

  useEffect(() => {
    const data = Cookies.get(shortCode)
    console.log(decodedShortCode, shortCode)
    console.log(data)
    if (!data) {
      navigate(`/expired`)
      return
    }
    const cookieTime = new Date(data)
    const currentTime = new Date()
    const timeDifference = (currentTime - cookieTime) / 1000 / 60 // 以分鐘為單位
    console.log(timeDifference)
    if (timeDifference > TIMEOUT) {
      navigate(`/expired`)
    } else {
      console.log('fetch data')
      setIsLoading(false)
    }
  }, [shortCode])

  return (
    <div>
      Redirect: {decodedShortCode}
      <button type="button" onClick={handleClick}>
        clear cookies
      </button>
      {!isLoading && <ProfileCard />}
    </div>
  )
}

export default Redirect
