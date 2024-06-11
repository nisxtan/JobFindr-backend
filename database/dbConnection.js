import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nisxtan:nisxal123@cluster0.f2ko4fo.mongodb.net/jobfinder?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DB connection established");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};

export default connectDB;
