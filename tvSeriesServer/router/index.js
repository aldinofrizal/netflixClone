const router = require('express').Router()
const Controller = require('../controller/tvSeries')

router.patch('/:id', Controller.update)
router.delete('/:id', Controller.deleteMov)
router.get('/', Controller.find)
router.post('/' , Controller.create)

module.exports = router