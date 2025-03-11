import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/profile/Nicole">Nicole's Profile</Link>
        </li>
        <li>
          <Link to="/download">demo v-card download</Link>
        </li>
      </ul>
    </div>
  )
}
export default Home
