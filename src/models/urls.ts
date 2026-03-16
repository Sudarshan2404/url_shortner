import mongoose from "mongoose";

const urlsSchema = new mongoose.Schema({
  code: String,
  originalUrl: String,
  clicks: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

export const urldb = mongoose.model("Urls", urlsSchema);
