var express = require('express');
var router = express.Router();
var userModel = require('../models/user.js');
var issueModel = require('../models/issue.js');

/* GET Userlist page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('issueCollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "issueList" : docs
        });
    });
});

/* GET Userlist page. */
router.get('/issue/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('issueCollection');
    collection.findOne({_id: req.params.id},function(e,issue){
        res.render('show_issue', {
            "issue" : issue
        });
    });
});


/* GET Userlist page. */
router.get('/users', function(req, res) {
    var db = req.db;
    var collection = db.get('userCollection');
    collection.find({},{},function(e,docs){
        res.render('user_list', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('new_user', { title: 'Add New User' });
});

router.get('/newissue', function(req, res) {
	res.render('new_issue', {title: 'Add new issue'});
})

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    var newUser = new userModel();
 
    // Get our form values. These rely on the "name" attributes
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.profession = req.body.profession;
    newUser.function = req.body.function;

    console.log(newUser);
    // Set our collection
    var collection = db.get('userCollection');

    // Submit to the DB
    collection.insert(newUser, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
    });
});

/* POST to Add User Service */
router.post('/addissue', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    var newIssue = new issueModel();
 
    // Get our form values. These rely on the "name" attributes
    newIssue.name = req.body.name;
    newIssue.description = req.body.description;
    newIssue.author = req.body.author;
    newIssue.assigned = req.body.assigned;
    newIssue.testedBy = req.body.testedBy;
    newIssue.status = req.body.status;
    newIssue.priority = req.body.priority;

    // Set our collection
    var collection = db.get('issueCollection');

    // Submit to the DB
    collection.insert(newIssue, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
    });
});

router.get('/delete/:id', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('issueCollection');

    // Submit to the DB
    collection.remove({_id:req.params.id}, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
            res.location("/");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
    });
});
module.exports = router;
