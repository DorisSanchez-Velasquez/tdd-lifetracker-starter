import * as React from "react"
import "../NutritionPage/Nutrition.css"

export default function NutritionCard(props) {
    console.log(props.nutrition)

  return (
    <div className="nutrition-card">
        <h3 className="nutrition-name">{props.nutrition.name}</h3>
        <img src={props.nutrition.image_url} className="nutrition-image"></img>
        <h4 className="nutrition-calories">{props.nutrition.calories}</h4>
        <h4 className="nutrition-category">{props.nutrition.category}</h4>
        <h4 className="nutrition-date">{props.nutrition.created_at}</h4>
    </div>
  )
}