const express = require("express");
const mongoose = require("mongoose");
const sellBuy = require("../mongoose/models/sellbuy");
const { json } = require("body-parser");
const SellBuy = require("../mongoose/models/sellbuy");

const router = express.Router();

router.get("/sellProduct", async (req, res) => {
  //   const data = await sellBuy.find({ productName: req.query.product }).exec();
  //   res.send(data);

  if (req.query.product) {
    const data = await sellBuy.find({ productName: req.query.product }).exec();
    res.send(data);
  } else if (req.query.sortBy === "lowerCostPrice") {
    const data = await sellBuy.find({}).sort({ costPrice: 1 }).exec();
    res.send(data);
  } else if (req.query.sortBy === "higherCostPrice") {
    const data = await sellBuy.find({}).sort({ costPrice: -1 }).exec();
    res.send(data);
  } else if (req.query.sortBy === "lowerSoldPrice") {
    const data = await sellBuy.find({}).sort({ soldPrice: 1 }).exec();
    res.send(data);
  } else if (req.query.sortBy === "higherSoldPrice") {
    const data = await sellBuy.find({}).sort({ soldPrice: -1 }).exec();
    res.send(data);
  } else {
    const data = await sellBuy.find().exec();
    res.send(data);
  }
  //   console.log("===>>>", data);
  //   data.then((response) => {
  //     res.send(response);
  //     // console.log("===>>>", response);
  //   });
  //   const data = await sellBuy.find({ productName: "Sonet" }).exec();
  //   //   console.log("===>>>", data);
  //   res.send(data);
});

router.patch("/sellProduct/:id", async (req, res) => {
  try {
    if (req.body.soldPrice <= 0) {
      throw new Error("Sold price value cannot be zero or negative value.");
    } else {
      const idd = new mongoose.Types.ObjectId(req.params["id"]);
      const data = await sellBuy.findOneAndUpdate(
        { _id: idd },
        { soldPrice: req.body.soldPrice }
      );
      console.log(data); // point to be noted with respect to async operation,consoles old value even if query executed successfully
      res.status(200).send("Updated successfully");
    }
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
    //res.sendStatus(400);
  }
});

router.delete("/sellProduct/:id", async (req, res) => {
  // console.log(req.params["id"]);
  try {
    const idd = new mongoose.Types.ObjectId(req.params["id"]); // converting id from string to ObjectID type
    const data = await sellBuy.deleteOne({ _id: idd });
    // res.send(200);
    // console.log(data);
    if (data.deletedCount === 1) {
      res.status(200).send("Deleted successfully");
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/sellProduct", (req, res) => {
  try {
    const pname = req.body.productName;
    if (pname.length < 4) {
      throw new Error("product name should have minimum of four characters");
    } else if (req.body.costPrice <= 0) {
      throw new Error("cost price value cannot be zero or negative value");
    } else {
      sellBuy
        .create({
          productName: req.body.productName,
          costPrice: req.body.costPrice,
          soldPrice: req.body.soldPrice,
        })
        .then((result) => {
          //console.log(result);
          res.status(201).send("Product Added");
        });
    }
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

module.exports = router;
