const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8085;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
 
app.use("/api/v2/course/", require("./course"));

app.listen(PORT, () => {
  console.log("Backend is running.. " + PORT);
});
