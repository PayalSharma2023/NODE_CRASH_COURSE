const express = require('express');
const ejs = require("ejs");
// express app
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose')
const mongodb = require('mongodb');
const dbURI = "mongodb+srv://peacko:peackopeacko1312@peacko.bl5glnj.mongodb.net//"
//register view engine
app.set('view engine', "ejs");

//listen for request
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


app.post('/blogs', (req, res)=>{
    console.log(req.body);
    // const blog = new blog(req.body);
    
    // blog.save()
    //     .then((result)=>{
    //         res.redirect('/bogs');
    //     })
    //     .catch((err) => {
    //         console.log(err)  
    //     })

});


app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host:', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});



app.get('/', (req,res) => {
    const blogs = [
        {title: 'yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Nario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'how to defeat browser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
// res.send('<p> home page </p>');
    //res.sendFile('./views/index.html', {root: __dirname});
    res.render('index', { title: "Home", blogs });
});

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

app.get('/about', (req,res) => {
   // res.sendFile('./views/about.html', {root: __dirname});
    //res.send('<p> About page </p>');
    res.render("about", {title: "about page"});
});

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
    res.render("create", {title: "create new blog"});
});




//404 page
app.use((req, res) => {
   // res.sendFile('./views/404.html', {root: __dirname})
   res.status(404).render('404', {title: "404"});
});