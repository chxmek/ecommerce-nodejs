// import
const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(morgan("dev"));
app.use(express.json()); // server can read json
app.use(cors());

// router
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// start server
app.listen(port, () => console.log("Server is running on port " + port));
