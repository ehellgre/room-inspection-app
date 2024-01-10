import { useState } from "react"
import { useUsersContext } from "../hooks/useUsersContext"

const UserDetails = ({ user }) => {
    const { dispatch } = useUsersContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
  
    const handleDelete = async () => {
      const response = await fetch('/api/v1/users/' + user._id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'}
      })
      const json = await response.json()
  
      if (response.ok) {
        setLoading(false)
        dispatch({type: 'DELETE_USER', payload: json})
      }
    }

    const handleEdit = () => {
        if (isEditing) {
            setIsEditing(false)}
        if (!isEditing) {
            setIsEditing(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let requestBody = {};

        if (firstName !== '') {
        requestBody.firstName = firstName;
        }

        if (lastName !== '') {
        requestBody.lastName = lastName;
        }

        if (role !== '') {
            requestBody.role = role
          }

        if (password !== '') {
        requestBody.password = password;
        }
        try {
            const response = await fetch('/api/v1/users/' + user._id, {
              method: 'PATCH',
              credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(requestBody)
            })
      
            const json = await response.json()
      
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setIsEditing(false)
                setFirstName('')
                setLastName('')
                setRole('')
                setPassword('')
                setIsUpdated(true)
            }
          } catch (error) {
            console.error('Error updating user:', error.message);
          }
    }
  
    return (
      <div className="audit-details">
        <h3>{user.email}</h3>
        <p><strong>ID: </strong>{user._id}</p>
        <p><strong>Etunimi: </strong>{user.firstName}</p>
        <p><strong>Sukunimi: </strong>{user.lastName}</p>
        <p><strong>Rooli: </strong>{user.role}</p>
        <div className="button-container">
            <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>

        {isUpdated && <h3>Käyttäjä päivitetty!</h3>}

        {isEditing && (<form className='audit-details' onSubmit={handleSubmit}>
            <h3>Muokkaa käyttäjän tietoja</h3>

            <label>Uusi etunimi</label>
            <input 
                type='text'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <label>Uusi sukunimi</label>
            <input 
                type='text'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <label>Uusi rooli</label>
            <input 
                type='text'
                onChange={(e) => setRole(e.target.value)}
                value={role}
            />
            <label>Uusi salasana</label>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button >Tallenna</button>
            {error && <div className='error'>{error}</div>}
        </form>)}
      </div>
    )
  }
  
  export default UserDetails