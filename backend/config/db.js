import mongoose from "mongoose";

export default async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
}
