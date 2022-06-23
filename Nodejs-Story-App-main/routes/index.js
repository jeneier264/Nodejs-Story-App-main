const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
//Login/Landing page

router.get('/', ensureGuest, (req, res)=>{
    res.render('login', {
        layout: 'login'
    })
})
router.get('/dashboard', ensureAuth, async (req, res)=>{
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            stories 
        })
        
    } catch (error) {
        console.error(error)
    }
    
    
})


module.exports = router