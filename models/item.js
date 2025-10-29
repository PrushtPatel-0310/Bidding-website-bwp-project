const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const itemSchema = new Schema(
  {
    _id: { type: Types.ObjectId, auto: true },
    sellerId: { type: Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    image: {
      type: String,
      default: "https://unsplash.com/photos/a-gold-dollar-coin-sitting-on-top-of-a-stack-of-black-boxes-upwCI7WppMk",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/a-gold-dollar-coin-sitting-on-top-of-a-stack-of-black-boxes-upwCI7WppMk"
          : v,
    },
    startingPrice: { type: Number, required: true },
    currentPrice: { type: Number, default: 0 },
    bidIncrement: { type: Number, default: 1 },
    startTime: Date,
    firstBidTime: Date,
    endTime: Date,
    status: {
      type: String,
      enum: ["draft", "pending", "active", "ended", "sold"],
      default: "draft",
    },
    highestBidId: { type: Types.ObjectId, ref: "Bid" },
    bidsCount: { type: Number, default: 0 },
    winnerId: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
