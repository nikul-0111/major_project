const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://nikul2004parmar:Dg6m9NHWj3WN67Fy@cluster0.kdfxj.mongodb.net/wanderlust"

const Listing = require("./models/listing.js");
const path = require("path");

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);
main()
    .then(() => {
        console.log("connect to db");
    })
    .catch((error) => {
        console.log(error);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));





app.listen(8080, () => {
    console.log("the port is listening");
});


// create route
app.get("/listings/new", async (req, res) => {
    res.render("listings/new");
});

// post routes for create route

app.post("/listings", async (req, res) => {
    let { tital, description, price, image, location, country } = req.body;
    // If your schema uses "contry", change "country" to "contry" below
    await Listing.create({ tital, description, price, image, location, country });
    res.redirect("/listings");
});


// index routes
app.get("/listings", async (req, res) => {
    const alllistings = await (Listing.find({}));
    res.render("listings/index", { alllistings });
});




// show routes
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
});

// edit routes
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
});
app.delete("/listings/:id",async(req,res)=>
{ 
    let{id} = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


// update route

app.put("/listings/:id",async(req,res)=>
{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id, {
        tital: req.body.tital,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        location: req.body.location,
        country: req.body.country
    });
   res.redirect("/listings");
});




// app.get("/testlisting", async (req, res) => {
//   let sampletesting = new Listing({
//          tital: "my new villa",
//         disripation: "by the bitch",
//          price: 1500,
//          location: "goa",
//          contry: "india",

//      })
//      await sampletesting.save();
//      console.log("sample was saved");
//      res.send("successfull testing");

// });




app.get("/", (req, res) => {
res.send("i am nikul");
});