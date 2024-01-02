import { createContext, useState, useContext, useEffect } from "react"
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js"
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
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

    useEffect(()=>{
        async function checkLogin(){
            const cookies = Cookies.get()
            
            if(!cookies.jwtCookie){
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return ;
            }
            try{
                const res = await verifyTokenRequest(cookies.jwtCookie)

                if(!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                } 
                setIsAuthenticated(true)
                setUser(res.data.message)
                setLoading(false)
            }catch(error){
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        
        checkLogin()
    }, [])

  return (
    <AuthContext.Provider 
        value={{
            signup, 
            signin,
            user, 
            isAuthenticated, 
            loading,
            errors
        }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider