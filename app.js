const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/item.js")
const mongoose_URL = "mongodb://127.0.0.1:27017/bidding"
const path = require("path");

app.set("view engine" , "ejs");
app.use(express.urlencoded({extended:true}));
app.set("views" , path.join(__dirname , "/views"));
app.use(express.static("public")); 

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

// //testing
// app.get ("/testItem", async (req, res) =>{ 
    
//     let sampleListing = new Item({
//  title: "My New Villa",
// description: "By the beach",
//  category:"electronic",
//  startingPrice:500,

// });

// await sampleListing.save();
// console.log ("sample was saved"); 
// res. send ("successful testing done");
// })


app.listen(8080 , ()=>{
    console.log("👌server running on 8080 port");
})