const express = require('express');
const ejs = require("ejs")
// express app
const app = express();

//register view engine
app.set('view engine', "ejs");

//listen for request
app.listen(3000);

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


app.get('/about', (req,res) => {
   // res.sendFile('./views/about.html', {root: __dirname});
    //res.send('<p> About page </p>');
    res.render("about", {title: "about page"});
});

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

app.get('/blogs/create', (req, res) => {
    res.render("create", {title: "create new blog"});
})
//404 page
app.use((req, res) => {
   // res.sendFile('./views/404.html', {root: __dirname})
   res.status(404).render('404', {title: "404"});
});