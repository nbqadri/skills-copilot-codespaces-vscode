//create webserver
const express = require('express');
const router = express.Router();
//import comments model
const Comment = require('../models/comments');

//import passport
const passport = require('passport');

//import user model
const User = require('../models/user');

//import product model
const Product = require('../models/products');

//import admin model
const Admin = require('../models/admin');

//import flash
const flash = require('connect-flash');

//import ensureAuthenticated
const {ensureAuthenticated} = require('../config/auth');

//import csrf
const csrf = require('csurf');

//import csrf protection
const csrfProtection = csrf();

//use csrf protection
router.use(csrfProtection);

//use flash
router.use(flash());

//route for adding comment
router.post('/addComment/:id', ensureAuthenticated, (req, res) => {
    //get id
    var id = req.params.id;
    //get user id
    var userId = req.user._id;
    //get comment
    var comment = req.body.comment;
    //get csrf token
    var csrfToken = req.csrfToken();
    //get date
    var date = new Date();
    //get user
    User.findById(userId, (err, user) => {
        if(err) throw err;
        //get product
        Product.findById(id, (err, product) => {
            if(err) throw err;
            //create comment object
            var commentObject = {
                user: user,
                comment: comment,
                date: date,
                csrfToken: csrfToken
            }
            //create comment
            Comment.create(commentObject, (err, comment) => {
                if(err) throw err;
                //add comment to product
                product.comments.push(comment);
                //save product
                product.save((err, product) => {
                    if(err) throw err;
                    //redirect back
                    req.flash('success_msg', 'Comment added');
                    res.redirect('back');
                });
            });
        });
    });
});

//route for deleting comment
router.post('/deleteComment/:id', ensureAuthenticated, (req, res) => {
    //get id
    var id = req.params.id;
    //get comment id
    var commentId = req.body.commentId;
    //get user id
    var userId = req.user._id;
    //get csrf token
    var csrfToken = req.csrfToken();
    //get date
    var date = new Date();
    //get
)

