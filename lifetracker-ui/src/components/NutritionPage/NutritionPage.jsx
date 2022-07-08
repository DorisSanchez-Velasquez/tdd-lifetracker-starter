import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NutritionOverview from "../NutritionPage/NutritionOverview"
import NutritionNew from "../NutritionPage/NutritionNew"
import NutritionDetail from "../NutritionPage/NutritionDetail"
import NotFound from "../NotFound/NotFound"
import "../NutritionPage/Nutrition.css"

export default function NutritionPage(props) {
  return (
    <div className="nutrition-page">
      <Routes>
          <Route path="/" element={<NutritionOverview />}></Route>
          <Route path="/create" element={<NutritionNew />}></Route>
          <Route path="/id/:nutritionId" element={<NutritionDetail />}></Route>
          <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}