import { useState, useEffect } from 'react'
import { useAuditsContext } from '../hooks/useAuditsContext'
import { useAuthContext } from '../hooks/useAuthContext';

const AuditForm = () => {
  const { dispatch } = useAuditsContext()
  const { user } = useAuthContext()

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [spaces, setSpaces] = useState([])
  const [spaceName, setSpaceName] = useState('')
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch('/api/v1/spaces', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            console.log("unauth");
          } else {
            throw new Error('network res error');
          }
        }
  
        const data = await response.json();
  
        if (response.ok) {
          setSpaces(data);
        }
      } catch (error) {
        console.error('fetch spaces fail:', error);
      }
    };
  
    fetchSpaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    /* 
    // GET katselmointi näyttää tältä
    {
      "_id": "657471f3d586af9b4124f0e4",
      "spaceName": "Ruokala",
      "spaceAddress": "Vihtatie 6",
      "email": "sami.kalliokoski@edu.lapinamk.fi",
      "questions": [
          {
              "question": "kyssäri 1",
              "answer": "vastaus 1",
              "note": "vapaata tekstiä"
          },
          {
              "question": "kyssäri 2",
              "answer": "vastaus 2",
              "note": ""
          }
      ],
      "createdAt": "2023-12-09T13:56:03.078Z",
      "updatedAt": "2023-12-09T13:56:03.078Z",
      "__v": 0
    } 
    */
    const audit = {spaceName, email: user.email, questions}
    
    const response = await fetch('/api/v1/audits', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(audit),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      dispatch({type: 'CREATE_AUDIT', payload: json})
    }

  }

  if(user) {
    return (
      <form className="create" onSubmit={handleSubmit}> 
        <h3>Uusi katselmointi</h3>

        <label>Valitse katselmoitava tila:</label>
        <select
          onChange={(e) => setSpaceName(e.target.value)}
          value={spaceName}
          className={emptyFields.includes('spaceName') ? 'error' : ''}
        >
          <option value="">Valitse tila</option>
          {spaces.map((space, index) => (
            <option key={index} value={space.name}>{space.name}</option>
          ))}
        </select>
        {/*
          tämä vaatisi katselmoinnin hakemisen tilan nimen perusteella, aika loppui kesken

        {Array.isArray(audit.questions) && audit.questions.map((question, index) => (
          <div>
            <label>Kysymys {index}: </label>
            <p><strong>{question.name}</strong></p>
            <label>Vastaus: </label>
            <input 
              type="text"
              value={answers}
            />
            <label>Lisää huomautus</label>
            <input
              type="text"
              value={notes}
            />
          </div>
        ))}
        */}

        <label>Kysymys  1:</label>
        <input 
          type="text" 
          placeholder='Vastaus 1'
        />

        <label>Kysymys 2</label>
        <input 
          type="text" 
          placeholder='Vastaus 2'
        />

        <button disabled={true}>Lähetä</button>
        {error && <div className="error">{error}</div>}
      </form>
    )
  } else {return null}
}

export default AuditForm