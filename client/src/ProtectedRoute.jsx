import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import {RingLoader} from 'react-spinners'

const ProtectedRoute = () => {
    const {isAuthenticated, loading} = useAuth()
    if(loading) {
        return (
        <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <RingLoader color="#36d7b7" />
        </div>
    )}

    if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>

    return <Outlet />
}

export default ProtectedRoute
