const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://0.0.0.0:27017/login-tut", {
    useUnifiedTopology: true
});


connect.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.log("Database cannot be connected" , err.message);
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;
 
