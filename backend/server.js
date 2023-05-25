const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8085;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/v2/authen/", require("./module/api_authen")); 
app.use("/api/v2/course/", require("./module/api_course"));
app.use("/api/v2/forms/", require("./module/api_form")); 
app.use("/api/v2/mail/", require("./module/api_mail")); 
app.listen(PORT, () => {
  console.log("Backend is running.. " + PORT);
});
