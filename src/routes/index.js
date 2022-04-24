const express = require("express");
const router = express.Router();
// user
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { register, login } = require("../controllers/auth");

// product
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

// category
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

//

//register user
router.post("/register", register);

// login
router.post("/login", login);

//users
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// product
router.post("/product", addProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

// category
router.post("/category", addCategory);
router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
