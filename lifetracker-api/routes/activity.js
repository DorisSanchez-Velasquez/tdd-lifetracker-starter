const express = require('express')
const Activity = require('../models/Activity')
const security = require('../middleware/security')
const permissions = require('../middleware/permissions')
const router = express.Router()


router.get("/", security.requireAuthenticatedUser, async (req,res,next) => {
    try
    {
        const {user} = res.locals
        const nutrition = await Activity.calculateDailyCaloriesSummaryStats({user})
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats({user})

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