import * as React from "react"
import "../LoginPage/login.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import apiClient from "../../services/apiClient"
import {useState, useEffect} from "react"

export default function LoginForm(props) {
    //VARIABLES
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    //USE EFFECT HOOK
    useEffect(() => {
    if(props.user?.email)
    {
        navigate("/activity")
    }
}, [props.user, navigate])



    function handleOnChange(evt)
    {
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

        setForm((form) => ({...form, [evt.target.name]: evt.target.value}))
    }

    async function handleOnSubmit(evt)
    {
        setIsProcessing(true)
        setErrors((err) => ({...err, email: null}))

        const {data, error} = await apiClient.loginUser({email: form.email, password: form.password})
        if(error)
        {
               setErrors((err) => ({...err, form: error}))
        }
        if(data?.user)
        {
               props.setUser(data.user)
               apiClient.setToken(data.token)
        }
        setIsProcessing(false)
        // evt.preventDefault();
        // props.setError("")
        // const response = await axios.post("http://localhost:3001/auth/login", {email: loginForm.email, password: loginForm.password})
        // .then((response) => {
        //     props.setUserLoggedIn(true)
        //     navigate("/activity")
        // })
        // .catch((error) => {
        //     props.setError(error)
        // })
    }


    return(
        <div className="login-form">
            <h1>Login</h1>

            <h3>{errors.form}</h3>

            <div>
            <h3>Email</h3>
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