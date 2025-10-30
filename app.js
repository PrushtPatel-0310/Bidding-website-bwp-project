const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/item.js")
const mongoose_URL = "mongodb://127.0.0.1:27017/bidding"
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");


app.set("view engine" , "ejs");
app.use(express.urlencoded({extended:true}));
app.set("views" , path.join(__dirname , "/views"));
app.use(express.static("public")); 
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs", ejsMate);
//db connecion
main()
.then( ()=>{console.log("💕DB is connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoose_URL);

}
//root route
app.get("/" , (req,res)=>{
    res.send("hi this is root")
})


//home page showing all items
app.get("/items" ,async (req,res)=>{
    const allItems = await Item.find({});
    res.render("items/index.ejs" , {allItems} );
} )

//getting form for new item
app.get("/items/new" ,(req,res)=>{
    res.render("items/new.ejs");
})

//showing item in detail
app.get("/items/:id" ,async (req,res)=>{
    let {id} = req.params;
    const item = await Item.findById(id);
    res.render("items/show.ejs" , {item} );
});

//saving new item to DB
app.post("/items",(req,res)=>{
    let newItem = new Item(req.body);
    newItem.save();
    res.redirect("/items");
})
//form for editing item
app.get("/items/:id/edit" , async(req,res)=>{
    let {id} =req.params;
    let item = await Item.findById(id);
    res.render("items/update.ejs",{item});
})
//updating item in DB
app.put("/items/:id" , async(req,res)=>{
    let {id} = req.params;
    await Item.findByIdAndUpdate(id , req.body , {runValidators:true , new:true});
    res.redirect(`/items/${id}`);
})

//deleting item from DB
app.delete("/items/:id" , async(req,res)=>{
    let{id}=req.params;
    await(Item.findByIdAndDelete(id));
    res.redirect("/items");
})

app.listen(8080 , ()=>{
    console.log("👌server running on 8080 port");
})