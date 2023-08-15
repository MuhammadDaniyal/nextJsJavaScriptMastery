import mongoose from "mongoose";

let isConnected = false // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // not shows / avoid console warnings

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "javascriptmastery",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}