import User from "../models/User";
import connectDB from "../mongoose";

async function getUserById(userId: string) {
  await connectDB();
  try {
    return await User.findById(userId).lean();
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Error fetching user by ID");
  }
}
