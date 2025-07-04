const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        tital:
        {
            type: String,
            required: true,
        },
        discription:
        {
            type: String,
        },
        image:
        {   
            type: String,
            default:"https://th.bing.com/th/id/OIP.Zis2cXdglxbZemS3QNsdZQHaE8?w=318&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            set: (v) => v === "" ? "https://th.bing.com/th/id/OIP.Zis2cXdglxbZemS3QNsdZQHaE8?w=318&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" : v,
        },
        price:
        {
            type: Number,

        },
        location:
        {
            type: String,
        },
        country:
        {
            type: String,
        },
    });
const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;