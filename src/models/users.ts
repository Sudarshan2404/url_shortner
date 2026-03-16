import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  Name: String,
});

export const urldb = mongoose.model("Users", userSchema);
