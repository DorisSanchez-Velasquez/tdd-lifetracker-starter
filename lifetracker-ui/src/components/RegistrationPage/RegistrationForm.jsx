import * as React from "react"
import {useState, useEffect} from "react"
import axios from "axios"
import apiClient from "../../services/apiClient"
import { useNavigate } from "react-router-dom";

export default function RegistrationForm(props) {       
  //VARIABLES
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
       email: "",
       password: "",
       passwordConfirm: ""
  })

  //USE EFFECT HOOK
  useEffect(() => {
       if(props.user?.email)
       {
           navigate("/login")
       }
  }, [props.user, navigate])

  //FUNCTION FOR WHEN A USER IS INPUTTING INFORMATION
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
                   setErrors((err) => ({...err, email: "Please enter a valid email"}))
              }
       }

       // if(evt.target.name === "password")
       // {
       //        if(props.form.passwordConfirm && props.form.passwordConfirm !== evt.target.value)
       //        {
       //               props.setError("Passwords do not match")
       //        }
       //        else
       //        {
       //               props.setError("")
       //        }
       // }

       if(evt.target.name === "passwordConfirm")
       {
              // if(props.form.password && props.form.password !== evt.target.value)
              // {
              //        props.setError("Passwords do not match")
              // }
              // else
              // {
              //        props.setError("")
              // }

              if(evt.target.value !== form.password)
              {
                     setErrors((err) => ({...err, passwordConfirm: "Passwords do not match!"}))
              }
              else
              {
                     setErrors((err) => ({...err, passwordConfirm: null}))
              }
       }


       setForm((formInput) => ({...formInput, [evt.target.name]: evt.target.value}))
       console.log(form)
  }

  //FUNCTION FOR WHEN A USER SUBMITS FORM
  async function handleOnSubmit(evt)
  {
       setIsProcessing(true)
       setErrors((err) => ({...err, form: null}))

       if(form.passwordConfirm !== form.password)
       {
              setErrors((err) => ({...err, passwordConfirm: "Passwords do not match!"}))
              setIsProcessing(false)
              return
       }
       else
       {
              setErrors((err) => ({...err, passwordConfirm: null}))
       }

       const {data, error} = await apiClient.registerUser({username: form.username, password: form.password, firstName: form.firstName, lastName: form.lastName, email: form.email})
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
       // if(props.form.passwordConfirm !== props.form.password)
       // {
       //        props.setError("Passwords do not match! Try again!")
       // }
       // else
       // {
       //        props.setError("")
       // }

       // evt.preventDefault();
       // const response = await axios.post("http://localhost:3001/auth/register", {
       //        email: props.form.email,
       //        username: props.form.username,
       //        firstName: props.form.firstName,
       //        lastName: props.form.lastName,
       //        password: props.form.password,
       // })
       // .then((response) => {
       //        navigate("/login")
       // })
       // .catch((error) => {
       //        props.setError("Invalid Registration Form! Try Again!")
       // })
       
  }

  return (
    <div className="registration-form">
        <h1>Register</h1>
       
        <h4>{errors.form}</h4>

        <h3>Email</h3>
        <input className="form-input"
               name="email"
               type="email"
               placeholder="Enter email ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>Username</h3>
        <input className="form-input"
               name="username"
               type="text"
               placeholder="Enter username ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>First Name</h3>
        <input className="form-input"
               name="firstName"
               type="text"
               placeholder="Enter first name ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>Last Name</h3>
        <input className="form-input"
               name="lastName"
               type="text"
               placeholder="Enter last name ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>Password</h3>
        <input className="form-input"
               name="password"
               type="password"
               placeholder="Enter password ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>Password Confirm</h3>
        <input className="form-input"
               name="passwordConfirm"
               type="password"
               placeholder="Confirm password ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <br></br>
        <button className="submit-registration" onClick={(evt) => handleOnSubmit(evt)}>Create Account</button>
    </div>
  )
}