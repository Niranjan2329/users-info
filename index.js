const express=require("express")
const mongoose=require("mongoose");
const Student=require("./models/student");
const { v4: uuidv4 } = require('uuid');

const app=express();

require("dotenv").config();
const port=process.env.PORT || 3000;

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.listen(port, () => console.log(' Server running at http://localhost:3000'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Connected to college DB'))
  .catch(err => console.error(err));

  let students=[];

  app.get("/display", async(req,res)=>{
    let students= await Student.find();
    
    res.render("display",{students});
  })

  app.get("/input",(req,res)=>{
    res.render("input");
  })
  app.post("/input",async (req,res)=>{
    let {name,rollno,course}=req.body;
    await Student.create({name,rollno,course});
    console.log(name,rollno,course);
    res.redirect("/display")

  })

  app.post("/delete/:id", async (req,res)=>{
    let {id}=req.params;
    await Student.findByIdAndDelete(id);
    res.redirect("/display")
  })

    app.get("/edit/:id",async(req,res)=>{
        let {id}=req.params;
       let student= await Student.findById(id);
    res.render("edit",{student});
  })
    app.post("/edit/:id",async(req,res)=>{
        let {id}=req.params;
        let {name,rollno,course}=req.body;
        await Student.findByIdAndUpdate(id,{name,rollno,course});
        res.redirect("/display");
  })

  app.get('/', (req, res) => {
    res.render('dashboard');  // Renders views/dashboard.ejs
});