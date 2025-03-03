import { useParams } from 'react-router-dom'

const Redirect = () => {
  const { shortCode } = useParams()
  const secretKey = process.env.REACT_APP_SECRET_KEY
  const decodedShortCode = atob(shortCode).replace(secretKey, '')
  return <div>Redirect: {decodedShortCode}</div>
}

export default Redirect
