const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const path = require("path");


mongoose.Promise = global.Promise
mongoose.connect("mongodb://127.0.0.1:27017/capstone", {
    useNewUrlParser: true
})
.then(() => console.log("connected successfully to db"))
.catch((err) => {
    console.log(err)
    process.exit()
})


const app = express()
const port = 3000

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.json("server is running")
})

app.get("/member/form", (req, res) => {
    res.render("createMember");
});


require("./routes/app.routes.js")(app)


app.listen(port, ()=> console.log(`server running on ${port}`))
