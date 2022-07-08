import * as React from "react"
import "../ActivityPage/ActivityPage.css"

export default function SummaryStat(props) 
{
  return (
    <div className="summary-stat">
        <p className="secondary-statistic">{props.substat}</p>
        <p className="primary-statistics">{props.stat}</p>
        <p className="label">{props.label}</p>
    </div>
  )
}