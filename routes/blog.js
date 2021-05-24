const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Blog = require('./../models/Blog')
const path = require('path')

// GET- get all blogs ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Blog.find().populate('user', '_id firstName')
    .then(blogs => {
      if(blogs == null){
        return res.status(404).json({
          message: "No blogs found"
        })
      }
      res.json(blogs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting blogs"
      })
    })  
})

// POST - create new blog --------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Blog content can't be empty"})
  }
  // validate - check if media file exist
  if(!req.files || !req.files.media){
    return res.status(400).send({message: "Please include an image"})
  }

  console.log('req.body = ', req.body)

  // media file must exist, upload, then create new blog
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  Utils.uploadFile(req.files.media, uploadPath, (uniqueFilename) => {    
    // create new blog
    let newBlog = new Blog({
      title: req.body.title,
      category: req.body.category,
      post: req.body.post,
      user: req.body.user,
      media: uniqueFilename,
      link: req.body.link,
    })
  
    newBlog.save()
    .then(blog => {        
      // success!  
      // return 201 status with blog object
      return res.status(201).json(blog)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating blog",
        error: err
      })
    })
  })
})

// export
module.exports = router