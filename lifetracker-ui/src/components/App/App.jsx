import * as React from "react"
import "./App.css"
import Navbar from "../Navbar/Navbar"
import Landing from "../LandingPage/Landing"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"
import AccessForbidden from "./AccessForbidden"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useState, useEffect} from "react"
import apiClient from "../../services/apiClient"
import {AuthContextProvider, useAuthContext} from "../../contexts/auth"

//  export default function AppContainer()
//  {
//    return(
//      <AuthContextProvider>
//          <App />
//      </AuthContextProvider>
//    )
//  }

export default function App() {
  //STATE VARIABLES
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [isFetching, setIsFetching] = useState()
  const [user, setUser] = useState({})
  const[error, setError] = useState("")
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: ""
  })
  const [totalCaloriesPerDay, setTotalCaloriesPerDar] = useState([])
  const [avgCaloriesPerCategory, setAvgCaloriesPerCategory] = useState([])

  //USE EFFECT HOOK FOR SETTING UP THE USER
  async function fetchingUser()
  {
    setIsFetching(true)
    const {data, error} = await apiClient.fetchUserFromToken()
    if(data)
    {
      setUser(data.user)
    }
    if(error)
    {
      setError(error)
      setIsFetching(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token)
    {
        apiClient.setToken(token)
        fetchingUser()
    }
  }, [])

  

  return (
    <div className="app">
      <React.Fragment>
        {/* YOUR CODE HERE! */}
            <BrowserRouter>
                <Navbar userLoggedIn={userLoggedIn}
                        setUserLoggedIn={setUserLoggedIn}
                        user = {user}
                        setUser = {setUser}/>
                        
                <Routes>
                      <Route path="/" element={<Landing />}></Route>

                      <Route path="/login" element={<LoginPage userLoggedIn={userLoggedIn}
                                                               setUserLoggedIn={setUserLoggedIn}
                                                               error={error}
                                                               setError={setError}
                                                               user = {user}
                                                               setUser = {setUser}/>}></Route>

                      <Route path="/register" element={<RegistrationPage form={form} 
                                                                         setForm={setForm}
                                                                         userLoggedIn={userLoggedIn}
                                                                         setUserLoggedIn={setUserLoggedIn}
                                                                         error={error}
                                                                         setError={setError}
                                                                         user={user}
                                                                         setUser={setUser}/>}></Route>

                      <Route path="/activity" element={user?.email ? (<ActivityPage userLoggedIn={userLoggedIn}
                                                                     setUserLoggedIn={setUserLoggedIn}
                                                                     totalCaloriesPerDay={totalCaloriesPerDay}
                                                                     avgCaloriesPerCategory={avgCaloriesPerCategory}/>) : (<AccessForbidden/>)}></Route>

                      <Route path="/nutrition/*" element={user?.email ? (<NutritionPage userLoggedIn={userLoggedIn}
                                                                         setUserLoggedIn={setUserLoggedIn}/>) : (<AccessForbidden/>)}></Route>

                      <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
