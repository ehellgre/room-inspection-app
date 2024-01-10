import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(firstName, lastName, email, password, passwordVerify)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Rekisteröidy</h3>

            <label>Etunimi</label>
            <input 
                type='text'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <label>Sukunimi</label>
            <input 
                type='text'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <label>Sähköposti</label>
            <input 
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Salasana</label>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <label>Salasana uudelleen</label>
            <input 
                type='password'
                onChange={(e) => setPasswordVerify(e.target.value)}
                value={passwordVerify}
            />

            <button disabled={isLoading}>Rekisteröidy</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup