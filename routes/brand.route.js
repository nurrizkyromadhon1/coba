const express = require('express')
const router = express.Router()
const { Get, Insert, GetByPK, Update, Delete } = require('../controller/brand.controller')
const { CheckPostBrand } = require('../middleware/middleware')

router.get('/', Get)
router.get('/:id', GetByPK)
router.post('/', CheckPostBrand, Insert)
router.put('/:id', Update)
router.delete('/:id', Delete)
module.exports = router