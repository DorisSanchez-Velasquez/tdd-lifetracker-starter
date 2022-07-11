import * as React from "react"
import {useState, useEffect} from "react"
import apiClient from "../../services/apiClient"
import {useAuthContext} from "../../contexts/auth"
import { useNavigate } from "react-router-dom";

export default function RegistrationForm(props) {       
  //VARIABLES
  const navigate = useNavigate()
  const {user, setUser} = useAuthContext()
  const {isProcessing, setIsProcessing} = useAuthContext()
  const {registerForm, setRegisterForm} = useAuthContext()
  const {errors, setErrors} = useAuthContext()

  //USE EFFECT HOOK
  useEffect(() => {
       if(user?.email)
       {
           navigate("/login")
       }
  }, [user, navigate])

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

       if(evt.target.name === "passwordConfirm")
       {

              if(evt.target.value !== registerForm.password)
              {
                     setErrors((err) => ({...err, passwordConfirm: "Passwords do not match!"}))
              }
              else
              {
                     setErrors((err) => ({...err, passwordConfirm: null}))
              }
       }


       setRegisterForm((formInput) => ({...formInput, [evt.target.name]: evt.target.value}))
  }

  //FUNCTION FOR WHEN A USER SUBMITS FORM
  async function handleOnSubmit(evt)
  {
       setIsProcessing(true)
       setErrors((err) => ({...err, form: null}))

       if(registerForm.passwordConfirm !== registerForm.password)
       {
              setErrors((err) => ({...err, passwordConfirm: "Passwords do not match!"}))
              setIsProcessing(false)
              return
       }
       else
       {
              setErrors((err) => ({...err, passwordConfirm: null}))
       }

       const {data, error} = await apiClient.registerUser({username: registerForm.username, password: registerForm.password, firstName: registerForm.firstName, lastName: registerForm.lastName, email: registerForm.email})
       if(error)
       {
              setErrors((err) => ({...err, form: error}))
       }
       if(data?.user)
       {
              setUser(data.user)
              apiClient.setToken(data.token)
       }
       setIsProcessing(false)
  }

  return (
    <div className="registration-form">
        <h1>Register</h1>
       
        <h4>{errors.form}</h4>

        <h3>Email</h3>
        <h4>{errors.email}</h4>
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
        <h4>{errors.passwordConfirm}</h4>
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