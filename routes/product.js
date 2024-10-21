const express = require("express");
const {
  create,
  list,
  remove,
  listBy,
  searchFilters,
  update,
  read,
} = require("../controllers/product");
const router = express.Router();

router.post("/product", create);
router.get("/products/:count", list);
router.get("/product/:id", read);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listBy);
router.post("/search/filters", searchFilters);

module.exports = router;
