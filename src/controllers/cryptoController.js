const cryptoModel = require("../models/currency");

// function to add the transaction in cryptocurrency portfolio
const addTransaction = async (req, res) => {
  const { name, symbol, amount, noOfCoins, pricePurchasedAt } = req.body;
  const newTransaction = new cryptoModel.Crypto({
    name: name,
    symbol: symbol,
    amount: amount,
    noOfCoins: noOfCoins,
    pricePurchasedAt: pricePurchasedAt,
    userId: req.userId,
  });
  try {
    await newTransaction.save();
    return res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// function to update the transaction in cryptocurrency portfolio
const updateTransaction = async (req, res) => {
  const id = req.params.id;
  const { name, symbol, amount, noOfCoins, pricePurchasedAt } = req.body;
  const updatedTransaction = {
    name: name,
    symbol: symbol,
    amount: amount,
    noOfCoins: noOfCoins,
    pricePurchasedAt: pricePurchasedAt,
    userId: req.userId,
  };
  try {
    await cryptoModel.Crypto.findByIdAndUpdate(id, updatedTransaction, {
      new: true,
    });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// function to delete the transaction in cryptocurrency portfolio
const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const transactionToBeDeleted = await cryptoModel.Crypto.findByIdAndDelete(
      id
    );
    if (!transactionToBeDeleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(202).json(transactionToBeDeleted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// function to get all the transaction in cryptocurrency portfolio
const getTransaction = async (req, res) => {
  try {
    const allTransactions = await cryptoModel.Crypto.find({
      userId: req.userId,
    });
    res.status(200).json(allTransactions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
};
