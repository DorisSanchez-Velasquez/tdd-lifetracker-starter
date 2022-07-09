import axios from "axios"
import {API_BASE_URL} from "../../constants.js"

class ApiClient 
{
    constructor(remoteHostUrl)
    {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    setToken(token)
    {
        this.token = token
    }

    async request({endpoint, method = `GET`, data = {}})
    {
        const url = `${this.remoteHostUrl}/${endpoint}`
        const headers = {
            "Content-Type" : "application/json",
            Authorization: this.token ? `Bearer ${this.token}` : "",

        }

        try{
            const res = await axios({url, method, data, headers})
            return({data: res.data, error: null})
        } catch(error){
            console.error(error.response)
            const message = error?.response?.data?.error?.message
            return {data: null, error: message || String(error)}
        }
    }

    async loginUser(credentials)
    {
        return await this.request({endpoint: `auth/login`, method: `POST`, data: credentials})
    }

    async registerUser(credentials)
    {
        return await this.request({endpoint: `auth/register`, method: `POST`, data: credentials})
    }

    async fetchUserFromToken()
    {
        return await this.request({endpoint: `auth/me`, method: `GET`})
    }

    async logoutUser()
    {
        this.setToken(null)
        localStorage.setItem(this.token, "")
    }

    async getNutritionList()
    {
        return await this.request({endpoint: `nutrition/`, method: `GET`, data: null})
    }

    async createNutrition(nutrition)
    {
        return await this.request({endpoint: `nutrition/create`, method: `POST`, data: nutrition})
    }

    async getNutritionById(nutritionId)
    {
        return await this.request({endpoint: `nutrition/${nutritionId}`, method: `GET`, data: nutritionId})
    }

    async getAvgAndTotalCalories()
    {
        return await this.request({endpoint: `activity/`, method: `GET`, data: null})
    }
}

// export default new ApiClient("http://localhost:3001")
export default new ApiClient("https://lifetracker-app365.herokuapp.com")