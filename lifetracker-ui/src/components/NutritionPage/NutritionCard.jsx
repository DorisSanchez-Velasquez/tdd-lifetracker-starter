import * as React from "react"
import "../NutritionPage/Nutrition.css"

export default function NutritionCard(props) {
    console.log(props.nutrition)

  return (
    <div className="nutrition-card">
        <img src={props.nutrition.image_url} className="nutrition-image"></img>
        <div className="card-text">
            <h3 className="nutrition-name">{props.nutrition.name.toUpperCase()}</h3>
            <div className="card-info">
                <div id="card-text-group">
                <h4 className="nutrition-calories">Calories: {props.nutrition.calories}</h4>
                <h4 className="nutrition-category"> Category: {props.nutrition.category}</h4>
                </div>
                <div id="card-text-group">
                <h4 className="nutrition-date">Created At: {props.nutrition.created_at}</h4>
                <h4 className="nutrition-quantity">Quantity: {props.nutrition.quantity}</h4>
                </div>
            </div>
        </div>
    </div>
  )
}