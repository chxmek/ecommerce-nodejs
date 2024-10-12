// import
const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");

// middleware
app.use(morgan("dev"));
app.use(express.json()); // server can read json
app.use(cors());

// router
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// start server
app.listen(5000, () => console.log("Server is running on port 5000"));
