const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/Signup.html");

})

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;


  mailchimp.setConfig({
    apiKey: "d6cc093094ab92971674e2a8f07d1dd2-us8",
    server: "us8",
  });
  const list_id = "bea9012d63";
  const run = async () => {
    const response = await mailchimp.lists.batchListMembers(list_id, {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }],
    });
    const url = "https://us8.api.mailchimp.com/3.0/list/bea9012d63";
    https.get(url, function(response){
      if (response.statusCode === 401) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    })

  }

  run();

});

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT, function() {
  console.log("server is running on port 3000");
});







// //
// mailchimp.setConfig({
//   apiKey: "d6cc093094ab92971674e2a8f07d1dd2-us8",
//   server: "us8",
// });
// const list_id = "bea9012d63";
// const run = async () => {
//   const data = await mailchimp.lists.batchListMembers(list_id, {
//   members: [{
//     email_address: email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: firstName,
//       LNAME: lastName
//     }
//   }]
// };
// const jsonData = JSON.stringify(data);
//
// const url = "https://us8.api.mailchimp.com/3.0/list/bea9012d63";
// const options = {
//   method: "POST",
//   auth: "smooth1: d6cc093094ab92971674e2a8f07d1dd2-us8"
// }
//
// const request = https.request(url, options, function(response) {
//   response.on("data", function(data) {
//     console.log(JSON.parse(data));
//   })
// })
//
//
// request.write(jsonData);
// request.end();
//
// });
//





// <!-- api key
// d6cc093094ab92971674e2a8f07d1dd2-us8 -->
//
// <!-- List id
// bea9012d63 -->
