const db = require('../db')
const {BadRequestError, NotFoundError} = require('../utils/errors')

class Activity
{
    //Method to calculate total amount of calories
    static async calculateDailyCaloriesSummaryStats()
    {
        const results = await db.query(
            `
                SELECT SUBSTRING (cast(created_at AS TEXT), 1, 10) as date, SUM(calories) AS totalCaloriesPerDay
                FROM nutrition
                GROUP BY date
            `
        )

        const nutrition= results.rows
        if(!nutrition)
        {
            throw new NotFoundError()
        }

        return nutrition
    }


    //Method to calculate total amount of calories per category
    static async calculatePerCategoryCaloriesSummaryStats()
    {
        const results = await db.query(
            `
                SELECT category, ROUND(AVG(calories) , 1) AS avgCaloriesPerCategory
                FROM nutrition
                GROUP BY category
            `
        )

        const perCategory= results.rows
        if(!perCategory)
        {
            throw new NotFoundError()
        }

        return perCategory
    }
}

module.exports = Activity