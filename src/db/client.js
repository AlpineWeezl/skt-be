import mongoose from "mongoose";

const dbURL = process.env.MONGO_CONN;

try {
    mongoose.connect(dbURL);
    console.log('MongoDB successfully connected');
} catch (error) {
    console.log(error);
}