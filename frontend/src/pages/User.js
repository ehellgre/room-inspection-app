import React, { useState, useEffect } from 'react';
import { useLogout } from '../hooks/useLogout'

const User = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const { logout } = useLogout()

  const confirmDelete = async () => {
      try {
        const response = await fetch(`/api/v1/users/${userId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
      });
        if (!response.ok) {
          throw new Error('User not found');
        }
        if (response.ok) {
          logout()
        }

      } catch (error) {
        console.error('Error deleting user:', error.message);
      } finally {
        setLoading(false);
        setIsConfirmingDelete(false)
      }
  }

  const cancelDelete = () => {
    setIsConfirmingDelete(false)
  }

  const handleDelete = () => {
    setIsConfirmingDelete(true)
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
      requestBody.firstName = firstName
    }

    if (lastName !== '') {
      requestBody.lastName = lastName
    }

    if (role !== '') {
      requestBody.role = role
    }

    if (password !== '') {
      requestBody.password = password
    }

    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
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
        setIsUpdated(true)
      }

    } catch (error) {
      console.error('Error updating user:', error.message);
    } finally {
      setLoading(false);
      setFirstName('')
      setLastName('')
      setRole('')
      setPassword('')
      setIsEditing(false)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/v1/users/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
      });
        if (!response.ok) {
          throw new Error('User not found');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser()
  }, [userId])

  if (loading) {
    return <p>Ladataan...</p>
  }

  if (!user) {
    return <p>Käyttäjää ei löytynyt.</p>
  }

  return (
    <div className="audit-details">
      <h2>Käyttäjän tiedot</h2>
      <p>
        <strong>Etunimi:</strong> {user.firstName}
      </p>
      <p>
        <strong>Sukunimi:</strong> {user.lastName}
      </p>
      <p>
        <strong>Sähköposti:</strong> {user.email}
      </p>
      <p>
        <strong>Rooli:</strong> {user.role}
      </p>
      <div className="button-container">
            <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
      </div>

      {isConfirmingDelete && (
        <div className="confirmation-popup">
          <h3>Haluatko varmasti poistaa käyttäjän?</h3>
          <button onClick={confirmDelete}>Kyllä</button>
          <button onClick={cancelDelete}>Peruuta</button>
        </div>
      )}

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
            {user.role === 'admin' && (<label>Uusi rooli</label>)}
            {user.role === 'admin' && (
            <input 
                type='text'
                onChange={(e) => setRole(e.target.value)}
                value={role}
            />)}
            <label>Uusi salasana</label>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={loading}>Tallenna</button>
            {error && <div className='error'>{error}</div>}
        </form>)}
    </div>

    
  );
};

export default User
