import { createContext, useState, useContext } from "react"
import { registerRequest, loginRequest } from "../api/auth.js"

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState(null)
    
    const signup = async user => {
        try{
            const response = await registerRequest(user)
            setUser(response.data)
            setIsAuthenticated(true)
        }catch(error){
            setErrors(error.response.data.message)
        }
    }

    const signin = async user => {
        try{
            const response = await loginRequest(user)
            setUser(response.data)
            setIsAuthenticated(true)
        }catch(error){
            setErrors(error.response.data.message)
        }
    }

  return (
    <AuthContext.Provider 
        value={{
            signup, 
            signin,
            user, 
            isAuthenticated, 
            errors
        }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider