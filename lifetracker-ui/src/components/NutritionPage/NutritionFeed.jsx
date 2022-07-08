import * as React from "react"
import apiClient from "../../services/apiClient"
import {useEffect, useState} from "react"
import NutritionCard from "../NutritionPage/NutritionCard"
import "../NutritionPage/Nutrition.css"
import {Link} from "react-router-dom"

export default function NutritionFeed(props) {
  return (
    <div className="nutrition-feed">
        <h1>Nutrition Feed</h1>
        {props.nutrition.length ? null : (<h3 className="empty-message">Nothing here yet ...</h3>)}
        {props.nutrition?.map((item) => {
          return (<Link to={`/nutrition/id/${item.id}`}><NutritionCard key={item.id} nutrition={item}/></Link>)
        })}
    </div>
  )
}