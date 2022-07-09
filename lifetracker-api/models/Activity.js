const db = require('../db')
const {BadRequestError, NotFoundError} = require('../utils/errors')

class Activity
{
    //Method to calculate total amount of calories
    static async calculateDailyCaloriesSummaryStats({user})
    {
        const results = await db.query(
            `
                SELECT SUBSTRING (cast(nutrition.created_at AS TEXT), 1, 10) as date, 
                        SUM(nutrition.calories) AS totalCaloriesPerDay
                FROM nutrition
                    LEFT JOIN users ON users.id = nutrition.user_id
                WHERE users.email = $1
                GROUP BY date
            `, [user.email]
        )

        const nutrition= results.rows
        if(!nutrition)
        {
            throw new NotFoundError()
        }

        return nutrition
    }


    //Method to calculate total amount of calories per category
    static async calculatePerCategoryCaloriesSummaryStats({user})
    {
        const results = await db.query(
            `
                SELECT category, ROUND(AVG(calories) , 1) AS avgCaloriesPerCategory
                FROM nutrition
                    LEFT JOIN users ON users.id = nutrition.user_id
                WHERE users.email = $1
                GROUP BY category
            `, [user.email]
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