import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/home">
          <h1>6s-Katselmointisovellus</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <Link to="/user">{user.email}</Link>
              {user.role === 'admin' && (<Link to="/admin">Admin</Link>)}
              <Link to="/tilat">Tilat</Link>
              <Link to="/ohjeet">Ohjeet</Link>
              <Link to="muistutukset">Muistutukset</Link>
              <button onClick={handleLogout}>Kirjaudu ulos</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/signup">Rekisteröidy</Link>
              <Link to="/login">Kirjaudu sisään</Link>
              
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar