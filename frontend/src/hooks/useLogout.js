import { useState } from 'react'
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const logout = async () => {

        // reset states
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/v1/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        // const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(response.message)
        }
        if (response.ok) {
            // dispatch logout action
            dispatch({type: 'LOGOUT'})

            setIsLoading(false)
        }
    }

    return {logout, isLoading, error}

}