import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "./AuthContext";

const ProtectedRoute=({children,allowedRoles})=>{
    const {user}=useContext(AuthContext)
    // check if there is a user /if the user is logged in
    if(!user){
        // incase there is no user we are taken to login
        return <Navigate to={"/login"} replace />;
    }
    if(!allowedRoles.includes(user.role)){
        // Not allowed
        // incase the logged in user has no role that has been predefined
        return <Navigate to='/not-authorized' replace/>

    }
    return children
}

export default ProtectedRoute