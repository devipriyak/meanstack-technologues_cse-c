var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://127.0.0.1:27017/users",(err)=>{
if(err)
	console.log("DB not connected");
else
	console.log("DB Connected");
});
const ns=new mongoose.Schema({
name:String,
email:String,
phno:Number,
pswd:String});
const nm=new mongoose.model("records",ns);
var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data =new nm( {
        "name": name,
        "email" : email,
        "phno": phno,
        "pswd" : password
    });
data.save();

        console.log("Record Inserted Successfully");
 

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");
