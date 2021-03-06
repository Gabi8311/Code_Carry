const express = require('express')
const router = express.Router()

const User = require('../../models/user.model')
const Question = require('../../models/question.model')
const { find } = require('../../models/user.model')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

///////////////////////
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : {message: "Inicia sesión"}
const isProfileOwner = (req, res, next) => req.params.user_id === req.users._id ? true : false
const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : null
//////////////////////

// Endpoints

router.get('/:user_id', ensureLoggedIn(),  (req, res, next) => {

    const promise1 = User.findById(req.params.user_id)
    const promise2 = Question.find({ "userOwner": req.params.user_id })
    const promise3 = Question.find()

    Promise
        .all([promise1, promise2, promise3])
        .then(allInfo => res.json(allInfo))
        .catch(err => next(err))

})

router.get('/edit/:user_id', ensureLoggedIn(), (req, res, next) => {
    User.findById(req.params.user_id)
        .then(user => res.send(user))
        .catch(err => next(err))

})

router.post('/edit/:user_id', ensureLoggedIn(), (req, res, next) => {
    console.log(req.body,'<----------------------------')
    User
    .findByIdAndUpdate(req.params.user_id, req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
    
    
})
router.post('/edit/delete/:user_id', ensureLoggedIn(), (req, res, next) => {
    
    res.send('estas eliminando tu perfil')///////////////////////////////////////
    
})
router.post('/question/new', ensureLoggedIn(), (req, res, next) => {

    Question
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))
})
router.get('/getdataforchat/:username', ensureLoggedIn(), (req, res, next) => {

    User
        .findOne({"username":req.params.username})
        .then(response => console.log(response))
})
router.post('/helper/:searchName', ensureLoggedIn(), (req,res,next) => {
    User
    .findOneAndUpdate({ "username": req.params.searchName },{ $push: { rating: req.body.rating ,comments:req.body.comments,}})
    .then(response => res.json(response))
    .catch(err => next(err))

})

module.exports = router
