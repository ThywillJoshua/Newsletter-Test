const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/signup", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/c33a9d416b";

  const options = {
    method: "POST",
    auth: "falante1:b58d83444cdd837bf40a4d7c1fdbd8d8-us5",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  //   request.write(jsonData);
  request.end();
});

app.post("/failure.html", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Port 3000 is live");
});
