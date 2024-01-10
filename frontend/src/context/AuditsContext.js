import { createContext, useReducer } from 'react'

export const AuditsContext = createContext()

export const auditsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUDITS':
      return { 
        audits: action.payload 
      }
    case 'CREATE_AUDIT':
      return { 
        audits: [action.payload, ...state.audits] 
      }
    case 'DELETE_AUDIT':
      return { 
        audits: state.audits.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const AuditsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auditsReducer, { 
    audits: null
  })
  
  return (
    <AuditsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuditsContext.Provider>
  )
}