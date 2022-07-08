const express = require('express')
const Activity = require('../models/Activity')
const security = require('../middleware/security')
const permissions = require('../middleware/permissions')
const router = express.Router()


router.get("/", security.requireAuthenticatedUser, async (req,res,next) => {
    try
    {
        const nutrition = await Activity.calculateDailyCaloriesSummaryStats()
        
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats()
        console.log(nutrition)
        console.log(perCategory)
        return res.status(200).json({nutrition: nutrition, perCategory: perCategory})
    }
    catch(error)
    {
        next(error)
    }
})


module.exports = router