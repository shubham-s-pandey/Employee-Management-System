const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');


//
router.get('/profile',isAuthenticated,(req,res) => {
  User.find((err, docs) => {
      if(!err){
          res.render("profile",{
              name: req.user.email,
              id: req.user._id
          });
      }
      else{
          console.log('Error in retrieving employee list :' + err);
      }
  });
});
//




router.get('/', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('profile');
  }
  else{
    res.render('index');
  }
});

router.get('/signup', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('profile');
  }
  else{
    res.render('signup');
  }
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); 

router.get('/signin', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('profile');
  }
  else{
    res.render('signin');
  }
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));




router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});
router.get('/employee',isAuthenticated, (req, res, next) => {
  res.render('employee');
});
router.get('/employee/addOrEdit',isAuthenticated, (req, res, next) => {
  res.render('/employee/addOrEdit');
});
router.get('/employee/list',isAuthenticated, (req, res, next) => {
  res.render('/employee/list');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});



function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}




module.exports = router;
