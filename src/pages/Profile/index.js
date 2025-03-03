import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Profile = () => {
  const { shortCode } = useParams()
  const navigate = useNavigate()
  const secretKey = process.env.REACT_APP_SECRET_KEY

  useEffect(() => {
    window.history.replaceState(null, '', '/')

    const encodedShortCode = btoa(`${shortCode}${secretKey}`)
    const data = Cookies.get(encodedShortCode)
    console.log(encodedShortCode)
    if (!data) {
      Cookies.set(encodedShortCode, new Date(), { expires: 0.1 })
    }
    navigate(`/redirect/${encodedShortCode}`)
  }, [])
  return <div>Profile: ${shortCode}</div>
}

export default Profile
