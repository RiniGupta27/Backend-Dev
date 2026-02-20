const express = require("express");
const router = express.Router();

let posts = [
 {id:1,title:"First Post",content:"This is first post"},
 {id:2,title:"Second Post",content:"Hello Blog!"}
];

// show all posts
router.get("/",(req,res)=>{
    res.render("blog/index",{posts});
});

// new post form
router.get("/new",(req,res)=>{
    res.render("blog/new");
});

// create post
router.post("/",(req,res)=>{
    const {title,content} = req.body;
    posts.push({id:posts.length+1,title,content});
    res.redirect("/blog");
});

// single post
router.get("/:id",(req,res)=>{
    const post = posts.find(p=>p.id==req.params.id);
    res.render("blog/show",{post});
});

module.exports = router;
