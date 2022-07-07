import * as React from "react"
import ActivityFeed from "../ActivityPage/ActivityFeed"

export default function ActivityPage(props) {
  return (
    <div className="activity-page">
        <ActivityFeed totalCaloriesPerDay = {props.totalCaloriesPerDay}
                      avgCaloriesPerCategory = {props.avgCaloriesPerCategory}/>
    </div>
    )
}