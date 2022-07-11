import * as React from "react"
import "../LoginPage/login.css"
import { Link, useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"
import {useEffect} from "react"
import {useAuthContext} from "../../contexts/auth"

export default function LoginForm(props) {
    
    //VARIABLES
    const navigate = useNavigate()
    const {user, setUser} = useAuthContext()
    const {isProcessing, setIsProcessing} = useAuthContext()
    const {errors, setErrors} = useAuthContext()
    const {loginForm, setLoginForm} = useAuthContext()


    //USE EFFECT HOOK
    useEffect(() => {
        if(user?.email)
        {
            navigate("/activity")
        }
    }, [user, navigate])



    function handleOnChange(evt)
    {
        setErrors((err) => ({...err, form: null}))
        if(evt.target.name === "email")
        {
            if(evt.target.value.indexOf("@") === -1)
            {
                setErrors((err) => ({...err, email: "Please enter a valid email"}))
            }
            else
            {
                setErrors((err) => ({...err, email: null}))
            }
        }

        setLoginForm((form) => ({...form, [evt.target.name]: evt.target.value}))
    }

    async function handleOnSubmit(evt)
    {
        setIsProcessing(true)
        setErrors((err) => ({...err, email: null}))
        setErrors((err) => ({...err, form: null}))

        const {data, error} = await apiClient.loginUser({email: loginForm.email, password: loginForm.password})
        if(error)
        {
               setErrors((err) => ({...err, form: "Invalid email/password combination"}))
        }
        if(data?.user)
        {
               setUser(data.user)
               apiClient.setToken(data.token)
        }
        setIsProcessing(false)
    }


    return(
        <div className="login-form">
            <h1>Login</h1>

            <h3>{errors.form}</h3>

            <div>
            <h3>Email</h3>
            <h3>{errors.email}</h3>
            <input type="email" 
                   placeholder="Type in email..."
                   name="email"
                   onChange = {(evt) => {handleOnChange(evt)}}
                   className="form-input" />
            </div>

            <div>
            <h3>Password</h3>
            <input type="password" 
                   placeholder="Type in password..."
                   name="password"
                   onChange = {(evt) => {handleOnChange(evt)}}
                   className="form-input" />
            </div>
            
            <br></br>
            <Link to="/activity"><button className="submit-login" onClick={(evt) => {handleOnSubmit(evt)}}> Login </button></Link>
        </div>
    )
}