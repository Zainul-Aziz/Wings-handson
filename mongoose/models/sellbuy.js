const mongoose = require("mongoose");

const { Schema, Model } = mongoose;

const sellBuySchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  costPrice: {
    type: Number,
    require: true,
  },
  soldPrice: {
    type: Number,
  },
});

const SellBuy = new mongoose.model("SellBuy", sellBuySchema);
module.exports = SellBuy;
