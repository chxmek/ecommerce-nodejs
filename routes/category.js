const express = require("express");
const router = express.Router();
const { create, list, remove } = require("../controllers/category");

// * when not use arrow function
// router.get("/category", function (req, res) {
//   res.send("Hello Category");
// });

router.post("/category", create);
router.get("/category", list);
router.delete("/category/:id", remove);

module.exports = router;
