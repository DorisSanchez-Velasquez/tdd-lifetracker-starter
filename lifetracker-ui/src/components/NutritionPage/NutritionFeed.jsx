import * as React from "react"
import apiClient from "../../services/apiClient"
import {useEffect, useState} from "react"
import NutritionCard from "../NutritionPage/NutritionCard"
import "../NutritionPage/Nutrition.css"
import {Link} from "react-router-dom"

export default function NutritionFeed(props) {
  return (
    <div className="nutrition-feed">
        <h3>{props.errors.nutrition}</h3>

        {props.nutrition.length ? null : (<h3 className="empty-message">Nothing here yet ...</h3>)}
        {props.nutrition?.map((product) => {
          return (<Link to={`/nutrition/id/${product.id}`} className="nutrition-links"><NutritionCard key={product.id} nutrition={product}/></Link>)
        })}
    </div>
  )
}