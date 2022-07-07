const Nutrition = require("../models/nutrition")
const {NadRequestError, ForbiddenError} = require("../utils/errors")

//CHECK IF AUTHENTICATED USER IF OWNER OF THE NUTRITION CREATIONS
const authUserOwnsNutrition = async (req,res,next) => {
    try{
        const {user} = res.locals
        const {nutritionId} = reqs.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)

        if(nutrition.userEmail !== user.email)
        {
            throw new ForbiddenError("User is not allowed to search other nutritions tracker of other users")
        }

        res.locals.nutrition = nutrition
        return next()
    } catch(error){
        return next(error)
    }
}

module.exports = {
    authUserOwnsNutrition
}