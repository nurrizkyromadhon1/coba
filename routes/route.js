const express = require('express')
const router = express.Router()
const userRoute = require('./user.route')
const profilRoute = require('./profil.route')
const brandRoute = require('./brand.route')
const phoneTypeRoute = require('./phone.type.route')
const morgan = require('morgan')

router.use(morgan('dev'))
router.get('/ping', (req, res) => {
    const pong = 'PING' || 'void'
    res.render('index', {
        pong
    })
    return
})

router.post('/signup', (req, res) => {
    const pong = 'PING' || 'void'
    res.render('register')
    return
})

router.use('/user', userRoute)
router.use('/profile', profilRoute)
router.use('/brand', brandRoute)
router.use('/phonetype', phoneTypeRoute)





module.exports = router