import * as React from "react"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import NutritionFeed from "../NutritionPage/NutritionFeed"
import Loading from "../Loading/Loading"
import apiClient from "../../services/apiClient"
import "../NutritionPage/Nutrition.css"

export default function NutritionOverview(props) {
  // const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [nutrition, setNutrition] = useState([])
  const [errors, setErrors] = useState("")
  async function getNutritionList()
  {
      const {data, error} = await apiClient.getNutritionList()
      if(error)
      {
        setErrors((err) => ({...err, nutrition: error}))
      }
      if(data)
      {
          setNutrition(data.nutrition)
      }
  }

  useEffect(() => {
    getNutritionList()
    console.log(nutrition)
  }, [])


  return (
    <div className="nutrition-overview">
      <h1 className="nutrition-title">Nutrition Overview</h1>
      <Link to="/nutrition/create"><button className="record-nutrition">Record Nutrition</button></Link>
      {!isLoading ? (<NutritionFeed nutrition={nutrition} errors={errors}/>) : (<Loading />)}
    </div>
  )
}