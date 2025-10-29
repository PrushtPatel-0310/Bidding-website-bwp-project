// this file is just for initializing the database with sample data

const mongoose = require ("mongoose");
const Item = require ("../models/item.js");
const initializeData = require("./data.js");

main()
.then( ()=>{console.log("💕DB is connected")})
.catch(err => console.log(err));

const mongoose_URL = "mongodb://127.0.0.1:27017/bidding"
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/bidding");

}
const initializeDB = async()=>{
    Item.deleteMany({});
    await Item.insertMany(initializeData.data);
    console.log("✨DB is initialized with sample data");    
}
initializeDB();