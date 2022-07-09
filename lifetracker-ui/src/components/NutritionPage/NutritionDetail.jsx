import * as React from "react"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import apiClient from "../../services/apiClient"
import NotFound from "../NotFound/NotFound"
import NutritionCard from "./NutritionCard"
import "../NutritionPage/Nutrition.css"

export default function NutritionDetail() {
  const [nutrition, setNutrition] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  var nutritionId = useParams().nutritionId

  async function getNutritionById()
  {
    setIsLoading(true)
    const {data, error} = await apiClient.getNutritionById(nutritionId)
    if(error)
    {
      setErrors((err) => ({...err, nutrition: error}))
      return(<NotFound />)
    }
    if(data)
    {
        setNutrition(data.nutrition)
        setIsLoading(false)
    }
  }

  useEffect(() => {
    getNutritionById()
  }, [])

  return (
    <div className="nutrition-detail">
        {isLoading ? (<h1 className="loading">Loading ...</h1>) 
                    : (<NutritionCard nutrition={nutrition}/>)}
    </div>
  )
}