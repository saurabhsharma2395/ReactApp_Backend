const express = require("express");
const { getTransaction, addTransaction, deleteTransaction, updateTransaction } = require("../controllers/cryptoController");
const cryptoRouter = express.Router();
const auth = require("../middlewares/authMiddleware");

cryptoRouter.get("/", auth, getTransaction);

cryptoRouter.post("/add", auth,  addTransaction);

cryptoRouter.post("/delete/:id", auth, deleteTransaction);

cryptoRouter.post("/update/:id", auth, updateTransaction);

module.exports = cryptoRouter