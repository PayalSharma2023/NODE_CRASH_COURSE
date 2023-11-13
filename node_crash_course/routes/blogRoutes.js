const express = require('express')
const Blog = require('../models/blog.js')
const router = express.Router();


router.get('/create', (req, res) => {
    res.render("create", {title: "create new blog"});
});

router.get('/' , (req, res) => {
    Blog.find().sort({createdAt : -1})
    .then((result) => {
        res.render('index', { title : 'all blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err)
    })

})



router.post('/', (req, res)=>{
    console.log(req.body);
    const blog = new Blog(req.body);
    
    blog.save()
    .then((result)=>{
        res.redirect('/bogs');
    })
    .catch((err) => {
        console.log(err)  
    })

});


router.get('/:id', (req,res) => {
    const id = req.params.id;
    //console.log(id)
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'blog details'});
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        })
})



module.exports = router;