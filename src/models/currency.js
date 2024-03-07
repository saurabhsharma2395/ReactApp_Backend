const mongoose = require("mongoose");

// Defining the schema for the Crypto collection/document
const CryptoSchema = mongoose.Schema({
   name: {
    type: String, 
    required: true
   },
   symbol: {
    type: String, 
    required: true
   },
   amount: {
    type: String, 
    required: true
   },
   noOfCoins: {
    type: String, 
    required: true
   },
   pricePurchasedAt: {
    type: String, 
    required: true
   },
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
   }
});

const Crypto = mongoose.model("Crypto", CryptoSchema);

module.exports = { Crypto, CryptoSchema };
