const mongoose =require ("mongoose");
const initData= require("./data.js");
const Listing = require("../models/listing.js");
// const { deleteMany } = require("../models/listing");

const MONGO_URL = "mongodb+srv://nikul2004parmar:Dg6m9NHWj3WN67Fy@cluster0.kdfxj.mongodb.net/wanderlust"


main()
    .then(() => {
        console.log("connect to db");
         return initdb();
    })
    .catch((error) => {
        console.log(error);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}
   
const initdb = async() =>
{
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data);
   console.log("data was initialised");
}
