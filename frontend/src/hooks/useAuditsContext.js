import { AuditsContext } from "../context/AuditsContext"
import { useContext } from "react"

export const useAuditsContext = () => {
  const context = useContext(AuditsContext)

  if(!context) {
    throw Error('useAuditsContext must be used inside a AuditsContextProvider')
  }

  return context
}