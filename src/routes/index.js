const express = require("express");
const router = express.Router();
require("dotenv").config();
const { auth } = require("../middlewares/auth");

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
// transaction
const { buyProducts, getTransactions } = require("../controllers/transaction");
// uploadFile
const { uploadFile } = require("../middlewares/uploadFile");

//

//register login user
router.post("/register", register);
router.post("/login", login);

//users
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// product
router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/products", auth, getProducts);
router.get("/product/:id", auth, getProduct);
router.patch("/product/:id", auth, updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// category
router.post("/category", auth, addCategory);
router.get("/categories", getCategories);
router.get("/category/:id", auth, getCategory);
router.patch("/category/:id", auth, updateCategory);
router.delete("/category/:id", auth, deleteCategory);

// transaction
router.post("/transaction", auth, buyProducts);
router.get("/transactions", auth, getTransactions);

module.exports = router;
