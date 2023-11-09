// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model')
const saltRounds = 10;

// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));
router.get('/userProfile', (req, res) => res.render('users/user-profile'));

// POST route ==> to process form data
router.post('/signup', (req, res, next) => {
    // console.log("The form data: ", req.body);
   
    const { username, email, password } = req.body;
    
    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
        console.log(`Password hash: ${hashedPassword}`); 
        return User.create({
            username,
            email,
            passwordHash: hashedPassword 
        })
})
      .then(userFromDB => {
        console.log('the new user is: ', userFromDB);
        res.redirect('/userProfile')
      })
      .catch(error => next(error));
  });


module.exports = router;
