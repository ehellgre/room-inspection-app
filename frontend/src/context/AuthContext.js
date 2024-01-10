import { createContext, useReducer, useEffect } from 'react'


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user})
        }

        // check if refresh token is valid
        const checkToken = async (req, res) => {
            // console.log('--------checkToken called')
            try {
                const response = await fetch('/api/v1/auth', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (res.message === 'Token not valid') { dispatch({ type: 'LOGOUT' })}
                if (response.message === 'Unauthorized') {
                    // console.log('token expired, logging out')
                    dispatch({ type: 'LOGOUT'})
                }
            } catch (error) {
                // console.log('-----------catch error log: ', + error)
                dispatch({ type: 'LOGOUT' })
            }
        }
        checkToken()
    }, [dispatch])
    
    // console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}