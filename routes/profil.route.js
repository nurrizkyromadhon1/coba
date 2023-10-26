const express = require('express')
const router = express.Router()
const { Get, Insert, GetByPK, Update, Delete } = require('../controller/profil.controller')
const { CheckPostProfile } = require('../middleware/middleware')

router.get('/', Get)
router.get('/:id', GetByPK)
router.post('/', CheckPostProfile, Insert)
router.put('/:id', Update)
router.delete('/:id', Delete)
module.exports = router