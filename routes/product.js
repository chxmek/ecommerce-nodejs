const express = require("express");
const {
  create,
  list,
  remove,
  listBy,
  searchFilters,
  update,
} = require("../controllers/product");
const router = express.Router();

router.post("/product", create);
router.get("/product/:count", list);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listBy);
router.post("/search/filters", searchFilters);

module.exports = router;
