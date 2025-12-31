import express from "express";
import dataBase from "../connection/collection.js";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { ObjectId } from "mongodb";

const db_collection = process.env.DB_COLLECTION;

const router = express();

router.get("/connected", (req, res) => {
  const collection = dataBase.collection(db_collection);
  console.log("ysoe");

  console.log(collection);

  // res.status(200).json({collection})
});

router.post("/reports", async (req, res) => {
  const { fieldCode, location, threatLevel, description, confirmed } = req.body;
  if (!fieldCode || !location || !threatLevel || !description) {
    return res
      .status(401)
      .json({ error: "Missing parameter or wrong parameter" });
  }
  if (
    typeof fieldCode !== "string" &&
    typeof location !== "string" &&
    typeof description !== "string"
  ) {
    return res.status(401).json({
      error: "fieldCode or location or description not typeof string",
    });
  }
  if (typeof threatLevel !== "number" && threatLevel < 1 && threatLevel > 5) {
    return res
      .status(401)
      .json({ error: " threatLevel not typeof number or not between 1-5" });
  }
  if (typeof confirmed !== "boolean") {
    return res.status(401).json({ error: " threatLevel not typeof boolean" });
  }
  if (!confirmed) {
    confirmed = false;
  }
  const collection = await dataBase.collection(db_collection).insertOne({
    fieldCode: fieldCode,
    location: location,
    threatLevel: threatLevel,
    description: description,
    timestamp: new Date(),
    confirmed: confirmed,
  });
  res.status(200).json({ id: collection.insertedId });
});

router.get("/reports", async (req, res) => {
  const collection = await dataBase.collection(db_collection).find().toArray();
  res.status(200).json({ msg: collection });
});

router.get("/reports/high", async (req, res) => {
  const collection = await dataBase
    .collection(db_collection)
    .find({ threatLevel: { $gte: 4 } })
    .toArray();
  res.status(200).json({ msg: collection });
});
router.put("/reports/:id/confirm", async (req, res) => {
  const id = req.params.id;
  const collection = await dataBase
    .collection(db_collection)
    .updateOne({ _id: new ObjectId(id) },{$set:{confirmed:true}} )
  res.status(200).json({ msg: collection });
});
router.delete('/reports/:id', async (req, res) => {
  const id = req.params.id;
   const collection = await dataBase
    .collection(db_collection)
    .deleteOne({ _id: new ObjectId(id) } )
  res.status(200).json({ msg: collection });
});


export default router;
