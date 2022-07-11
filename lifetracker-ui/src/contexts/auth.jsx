import {createContext, useState, useContext} from "react"

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
        //STATE VARIABLES
        const [user, setUser] = useState({})
        const [initialized, setInitialized] = useState(false)
        const [isProcessing, setIsProcessing] = useState(false)
        const [errors, setErrors] = useState({})
        const [loginForm, setLoginForm] = useState({
            email: "",
            password: ""
        })
        const [registerForm, setRegisterForm] = useState({
            email: "",
            password: "",
            passwordConfirm: ""
       })

        const authValue = {user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, errors, setErrors, loginForm, setLoginForm, registerForm, setRegisterForm}

        return (
            <AuthContext.Provider value={authValue}>
                <>{children}</>
            </AuthContext.Provider>
        )
}


export const useAuthContext = () => useContext(AuthContext)