import { useContext, useDebugValue, useEffect } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        console.log(auth.accessToken)
    },[auth.accessToken])

    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;