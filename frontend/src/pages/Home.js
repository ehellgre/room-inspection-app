import { useEffect } from "react"
import { useAuditsContext } from "../hooks/useAuditsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import AuditDetails from "../components/AuditDetails"
import AuditForm from "../components/AuditForm"
import QRCodeReader from "../components/QRCodeReader"

const Home = () => {
  const { audits, dispatch } = useAuditsContext()
  const { user } = useAuthContext()
  

  
    const fetchAudits = async () => {
      try {
        const response = await fetch('/api/v1/audits', {
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
          dispatch({type: 'SET_AUDITS', payload: json})
        }
    } catch (error) {
      console.error('Error fetching data: ', error)
    }}
    
    useEffect(() => {
      fetchAudits()
    }, [dispatch])
  

  return (
    <div className="home">
      <div className="audits">
        {user && Array.isArray(audits) && audits.map(audit => (
          <AuditDetails audit={audit} key={audit._id} />
        ))}
      </div>
      <AuditForm />
      <QRCodeReader />
    </div>
  )
}

export default Home