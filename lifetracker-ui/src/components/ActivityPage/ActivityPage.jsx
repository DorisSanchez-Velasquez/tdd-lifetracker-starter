import * as React from "react"
import {useState, useEffect} from "react"
import ActivityFeed from "../ActivityPage/ActivityFeed"
import Loading from "../Loading/Loading"
import apiClient from "../../services/apiClient"

export default function ActivityPage(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState("")

  async function getAvgAndTotalCalories()
  {
    setIsProcessing(true)
    const {data, error} = await apiClient.getAvgAndTotalCalories()
    if(error)
    {
      setIsProcessing(false)
      setErrors((err) => ({...err, nutrition: error}))
    }
    if(data)
    {
        setIsLoading(false)
        props.setAvgCaloriesPerCategory(data.perCategory)
        props.setTotalCaloriesPerDay(data.nutrition)

        console.log(props.avgCaloriesPerCategory)
      console.log(props.totalCaloriesPerDay)
    }
  }

  useEffect(() => {
      setIsLoading(true)
      getAvgAndTotalCalories()

      console.log(props.avgCaloriesPerCategory)
      console.log(props.totalCaloriesPerDay)
  }, [])

  return (
    <div className="activity-page">
        <h5>{errors.nutrition}</h5>
        {isLoading || !isProcessing ? (<Loading />) : (<ActivityFeed totalCaloriesPerDay = {props.totalCaloriesPerDay} avgCaloriesPerCategory = {props.avgCaloriesPerCategory}/>)}
    </div>
    )
}