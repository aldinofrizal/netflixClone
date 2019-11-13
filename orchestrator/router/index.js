const router = require('express').Router()
const { 
    findEntertain, 
    updateMovie, 
    updateSeries, 
    deleteMovie, 
    deleteSeries, 
    postMovie, 
    postSeries
} = require('../controller/index')

router.post('/movies' , postMovie)
router.post('/series' , postSeries)

router.get('/' , findEntertain)


router.patch('/movies/:id', updateMovie)
router.patch('/series/:id', updateSeries)

router.delete('/movies/:id', deleteMovie)
router.delete('/series/:id', deleteSeries)



module.exports = router