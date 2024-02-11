const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017/SellAndBuy";
mongoose.connect(URL, {
  // useCreateIndex: true,
  // useNewURLParser: true,
  // useUnifiedTopology: true,
  // useFindandModify: false,
});
