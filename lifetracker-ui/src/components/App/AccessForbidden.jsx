import * as React from "react"
import { useNavigate } from "react-router-dom"
import {useEffect} from "react"

export default function AccessForbidden() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/login")
  }, [])

  return (
    <div>
        <h1>Access Forbidden</h1>
    </div>
  )
}