import * as React from "react"
import "../ActivityPage/ActivityPage.css"
import SummaryStat from "../ActivityPage/SummaryStat"

export default function ActivityFeed(props) {
  return(

    <div className="activity-feed">
        <h1 id="page-title">Activity Feed</h1>
        {/* <div className = "per-category">
            <div className="category" id="exercise">
                <h4 id="title">Total Exercise Minutes</h4>
                <p id="stats">0</p>
            </div>
            <div className="category" id="sleep">
                <h4 id="title">Avg Sleep Hours</h4>
                <p id="stats">0</p>
            </div>
            <div className="category" id="calories">
                <h4 id="title">Avg Daily Calories</h4>
                <p id="stats">0</p>
            </div>
        </div>

        <h1>More Stats</h1>
        <div className="per-category">
            <div className="category" id="max-calories">
                <h4 id="title">Maximum Hourly Calories</h4>
                <p id="stats">0</p>
            </div>
            <div className="category" id="avg-exercise">
                <h4 id="title">Avg Exercise Intensity</h4>
                <p id="stats">0</p>
            </div>
            <div className="category" id="max-sleep">
                <h4 id="title">Total Hours Slept</h4>
                <p id="stats">0</p>
            </div>
        </div> */}

        <h4 id="title">Total Calories Per Day</h4>
        <div className="stats-info">
        {
            props.totalCaloriesPerDay?.map((item) => {
                return(<SummaryStat stat={item.totalcaloriesperday} label="calories" substat={item.date}/>)
            })
        }
        </div>

        
        <h4 id="title">Average Calories Per Category</h4>
        <div className="stats-info">
        {
            props.avgCaloriesPerCategory?.map((category) => {
                return(<SummaryStat stat={category.avgcaloriespercategory} label="calories" substat={category.category}/>)
            })
        }
        </div>
        <br></br>
        <br></br>
    </div>
  )
}