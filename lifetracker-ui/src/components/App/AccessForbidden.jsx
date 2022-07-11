import * as React from "react"
import { useNavigate } from "react-router-dom"
import {useEffect} from "react"
import {useAuthContext} from "../../contexts/auth"

export default function AccessForbidden() {
  const navigate = useNavigate()
  const {errors, setErrors} = useAuthContext()

  useEffect(() => {
    setErrors((err) => ({...err, form: "Must be logged in to access those pages!"}))
    navigate("/login")
  }, [])

  return (
    <div>
        <h1>Access Forbidden</h1>
    </div>
  )
}