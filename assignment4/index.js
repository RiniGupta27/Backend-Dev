const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use((req,res,next)=>{
    const start = Date.now();
    res.on("finish",()=>{
        console.log(`${req.method} ${req.url} - ${Date.now()-start}ms`);
    });
    next();
});


app.get("/", (req,res)=>{
    res.render("index");
});


const users = [
    {name:"kavya"},
    {name:"piya"},
    {name:"eloise"},
    {name:"ruhani"},
    {name:"butterfly"}
];

app.get("/users",(req,res)=>{
    const name = req.query.name;
    if(!name) return res.send("Use ?name=kavya");

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(name.toLowerCase())
    );

    res.render("users",{filteredUsers});
});


app.get("/contact",(req,res)=>{
    res.render("contact");
});

app.post("/contact",(req,res)=>{
    const {name,message} = req.body;
    res.send(`Thank you ${name}, message received!`);
});


app.get("/gallery",(req,res)=>{
    const images = ["img1.jpg","img2.jpg","img3.jpg"];
    res.render("gallery",{images});
});


const blogRoutes = require("./routes/blog");
app.use("/blog", blogRoutes);


app.use((req,res)=>{
    res.status(404).render("404");
});

app.listen(PORT,()=>{
    console.log("Server running on port 3000");
});
