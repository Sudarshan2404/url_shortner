import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connURI: string | undefined = process.env.CONNECTION_URI;
    if (!connURI) {
      throw new Error("CONNECTION_URI environment variable is not defined");
    }
    const conn = await mongoose.connect(connURI);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("an error occured while connecting to database", error);
  }
};
