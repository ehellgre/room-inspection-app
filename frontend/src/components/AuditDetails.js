import { useAuditsContext } from '../hooks/useAuditsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const AuditDetails = ({ audit }) => {
  const { dispatch } = useAuditsContext()

  const handleClick = async () => {
    const response = await fetch('/api/v1/audits/' + audit._id, {
      method: 'DELETE',
      credentials: 'include'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_AUDIT', payload: json})
    }
  }

  return (
    <div className="audit-details">
      <h4>{audit.spaceName} - {audit.spaceAddress}</h4>
      <p><strong>Katselmoijan email: </strong>{audit.email}</p>
      <p><strong>Katselmoinnin kysymykset: </strong></p>
      {Array.isArray(audit.questions) && audit.questions.map((q, index) => (
        <div key={index}>
          <p key={`question-${index}`}><strong>{q.question}:</strong></p>
          <p key={`answer-${index}`}>{q.answer}</p>
          <p key={`note-${index}`}>{q.note}</p>
        </div>
      ))}
      <p><strong>{formatDistanceToNow(new Date(audit.createdAt), { addSuffix: true })}</strong></p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default AuditDetails