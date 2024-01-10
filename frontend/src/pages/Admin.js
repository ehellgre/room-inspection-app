import { useEffect } from "react"
import { useUsersContext } from "../hooks/useUsersContext"
import { useAuthContext } from "../hooks/useAuthContext"
import UserDetails from "../components/UserDetails"

const Admin = () => {
    const { users, dispatch } = useUsersContext()
    const { user } = useAuthContext()

    const fetchUsers = async () => {
        try {
          const response = await fetch('/api/v1/users', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (!response.ok) {
            if (response.status === 401) {
              console.log("Unauthorized")
            } else {
              throw new Error('Network response not ok')
            }
          }
  
          const json = await response.json()
  
          if (response.ok) {
            dispatch({type: 'SET_USERS', payload: json})
          }
      } catch (error) {
        console.error('Error fetching data: ', error)
      }}
      
      useEffect(() => {
        fetchUsers()
      }, [dispatch])

    return (
        <div className="home">
          <div className="audits">
          <button onClick={fetchUsers}>Päivitä</button>
            {user.role === 'admin' && Array.isArray(users) && users.map(user => (
              <UserDetails user={user} key={user._id} />
            ))}
          </div>
        </div>
      )
}

export default Admin