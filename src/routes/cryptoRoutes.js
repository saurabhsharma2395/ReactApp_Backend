const express = require("express");
const { getTransaction, addTransaction, deleteTransaction, updateTransaction } = require("../controllers/cryptoController");
const cryptoRouter = express.Router();
const auth = require("../middlewares/validateRequest");

cryptoRouter.get("/", auth, getTransaction);

cryptoRouter.post("/", auth,  addTransaction);

cryptoRouter.delete("/:id", auth, deleteTransaction);

cryptoRouter.put("/:id", auth, updateTransaction);

module.exports = cryptoRouter