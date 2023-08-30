const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

mailchimp.setConfig({
  apiKey: "3d04b7de353cdc40d8ea77b21e609583-us21",
  server: "us21",
});

// Calling the express.json() method for parsing
app.use(bodyParser.json());

// app.get("/:id", async (req, res) => {
//   console.log("Function Run for CERTFICATION");
//   try {
//     const response = await mailchimp.searchMembers.search(req.params.id);
//     if (response["exact_matches"]["total_items"] === 0) {
//       res.status(404).send("No Data Found for Related Email !");
//     } else {
//       res.send({
//         firstName:
//           response["exact_matches"]["members"][0]["merge_fields"]["FNAME"],
//         lastName:
//           response["exact_matches"]["members"][0]["merge_fields"]["LNAME"],
//         membership:
//           response["exact_matches"]["members"][0]["merge_fields"]["PMPLEVEL"],
//         joined: response["exact_matches"]["members"][0]["timestamp_opt"],
//         uid: response["exact_matches"]["members"][0]["unique_email_id"],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error !");
//   }
// });

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.get("/ping", async (req, res) => {
  console.log("Function Run for PING");
  try {
    const response = await mailchimp.searchMembers.search(req.body.email);
    if (response["exact_matches"]["total_items"] === 0) {
      res.status(404).send("No Data Found for Related Email !");
    } else {
      res.send({
        firstName:
          response["exact_matches"]["members"][0]["merge_fields"]["FNAME"],
        lastName:
          response["exact_matches"]["members"][0]["merge_fields"]["LNAME"],
        membership:
          response["exact_matches"]["members"][0]["merge_fields"]["PMPLEVEL"],
        joined: response["exact_matches"]["members"][0]["timestamp_opt"],
        uid: response["exact_matches"]["members"][0]["unique_email_id"],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error !");
  }
});

app.listen(port, () => {
  console.log(
    `*==============* App Server listening on port ${port} *==============*`
  );
});
