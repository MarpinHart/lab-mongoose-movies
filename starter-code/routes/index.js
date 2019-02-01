const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/Celebrity")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then( celebrities => res.render('celebrities/index', {celebrities}))
    .catch(err => {
      console.log("ERROR!! ", err)
      res.redirect()
    } )
})

router.get('/celebrities/new', (req, res, next) => { //GET ROUTE
    res.render('celebrities/new')
})

router.post('/celebrities/new', (req, res, next) =>{
    const {name, occupation, catchPhrase} = req.body
    const newCelebrity = new Celebrity({ name, occupation, catchPhrase })
    newCelebrity.save()
      .then((celebrity) => res.redirect('celebrities/index'))
      .catch(err => {
        console.log("HORROR ",err)
        res.redirect('celebrities/new')
      })
})

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => res.render('celebrities/show', {celebrity}))
    .catch(err => console.log("ORROR!", err))
})    


module.exports = router;
