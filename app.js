//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;


    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName

            }
        }]
    };
    let jsonDATA = JSON.stringify(data);
    const url = 'https://us21.api.mailchimp.com/3.0/lists/0bc1ef9578'

    const option = {
        method: "POST",
        auth: "soubir008:003566eb7be9488189854cf66c09b1ab-us21"
    }


    const request = https.request(url, option, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonDATA);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});



// API KEY
// 003566eb7be9488189854cf66c09b1ab-us21