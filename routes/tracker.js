const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Tracker = require('./../models/Tracker')

// GET- get tracker entries ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Tracker.find()
    .then(trackerEntries => {
      if(trackerEntries == null){
        return res.status(404).json({
          message: "No entries found"
        })
      }
      res.json(trackerEntries)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting tracker entries"
      })
    })  
})

// POST - create new tracker entry --------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Tracker content can't be empty"})
  }
  // validate - check if all fields are complete
  if(!req.body){
    return res.status(400).send({message: "Please compete all sections"})
  }

  console.log('req.body = ', req.body)

  // create new tracker entry
  let newTrackerEntry = new Tracker({
    gratitude: req.body.gratitude,
    reflection: req.body.reflection,
    movement: req.body.movement,
    user: req.body.user,
    emotion: req.body.emotion,
    variety: req.body.variety,
  })
  
  newTrackerEntry.save()
    .then(trackerEntries => {        
      // success!  
      // return 201 status with tracker object
      return res.status(201).json(trackerEntries)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating entry",
        error: err
      })
    })
  })

// export
module.exports = router