const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8085;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/v2/course/", require("./api_course"));
app.use("/api/v2/authen/", require("./api_authen")); 
app.use("/api/v2/forms/", require("./api_form")); 
app.listen(PORT, () => {
  console.log("Backend is running.. " + PORT);
});
