import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Profile = () => {
  const { shortCode } = useParams()
  const navigate = useNavigate()
  const secretKey = process.env.REACT_APP_SECRET_KEY

  useEffect(() => {
    window.history.replaceState(null, '', '/')

    const encodedShortCode = btoa(`${shortCode}${secretKey}`)
    // window.location.href = `/redirect/${shortCode}`
    navigate(`/redirect/${encodedShortCode}`)
  }, [])
  return <div>Profile: ${shortCode}</div>
}

export default Profile
