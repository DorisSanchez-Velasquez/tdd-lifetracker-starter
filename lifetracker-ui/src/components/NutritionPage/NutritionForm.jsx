import * as React from "react"
import {useState} from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"

export default function NutritionForm() {
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()

    function handleOnChange(evt)
    {
        if(evt.target.value === null)
        {
            setErrors((err) => ({...err, form: "Missing some form fields!"}))
        }
        setForm((formInput) => ({...formInput, [evt.target.name]: evt.target.value}))
        console.log(form)
    }

    async function handleOnSubmit(evt)
    {
        setIsProcessing(false)
        setErrors((err) => ({...err, form: null}))
        const {data, error} = await apiClient.createNutrition({name: form.name, category: form.category, calories: form.calories, imageUrl: form.imageUrl, quantity: form.quantity})
        if(error)
        {
               setErrors((err) => ({...err, form: error}))
        }
        if(data)
        {
               navigate("/nutrition")
        }
        setIsProcessing(false)
    }

  return (
    <div className="nutrition-form">
        <h3>{errors.form}</h3>
        <form>
            <div>
                <h3>Name</h3>
                <input name = "name"
                       type= "text"
                       placeholder= "Enter nutrition item name..."
                       onChange= {(evt) => {handleOnChange(evt)}}
                       className="form-input"/>
            </div>
            <div>
                <h3>Calories</h3>
                <input name = "calories"
                       type= "number"
                       placeholder= "Enter amount of calories..."
                       onChange= {(evt) => {handleOnChange(evt)}}
                       className="form-input"/>
            </div>
            <div>
                <h3>Image Url</h3>
                <input name = "imageUrl"
                       type= "text"
                       placeholder= "Enter the nutrition image url..."
                       onChange= {(evt) => {handleOnChange(evt)}}
                       className="form-input"/>
            </div>
            <div>
                <h3>Category</h3>
                <input name = "category"
                       type= "text"
                       placeholder= "Enter the nutrition category..."
                       onChange= {(evt) => {handleOnChange(evt)}}
                       className="form-input"/>
            </div>
            <div>
                <h3>Quantity</h3>
                <input name = "quantity"
                       type= "number"
                       placeholder= "Enter the nutrition quantity..."
                       onChange= {(evt) => {handleOnChange(evt)}}
                       className="form-input"/>
            </div>
        </form>

        <button className="submit-nutrition" onClick={(evt) => {handleOnSubmit(evt)}}> Save </button>
    </div>
  )
}