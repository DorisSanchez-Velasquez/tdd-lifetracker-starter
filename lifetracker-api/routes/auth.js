const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {createUserJwt} = require('../utils/tokens')
const security = require("../middleware/security")


router.post("/login", async (req,res,next) => {
    try
    {
        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({user, token})
    }
    catch(error)
    {
        next(error)
    }
})

router.post("/register", async (req,res,next) => {
    try
    {
        //Taking user, password, and number of guests and create new user in DB
        const user = await User.register(req.body)
        const token = createUserJwt(user)
        return res.status(201).json({ user, token })
    }
    catch(error)
    {
        next(error)
    }
})

router.get("/me", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        const {email} = res.locals.user
        const user = await User.fetchUserByEmail(email)
        const publicUser = User.makePublicUser(user)
        return res.status(200).json({user: publicUser})
    }
    catch(error)
    {
         next(error)
    }
})


module.exports = router