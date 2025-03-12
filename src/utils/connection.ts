import mongoose from "mongoose";

const DATABASE_URL =
    process.env.DATABASE_URL || "mongodb://localhost:27017/youtube-backend";

export function connectDatabase() {
    mongoose
        .connect(DATABASE_URL)
        .then(() => {
            console.log("Mongodb connected...");
        })
        .catch((error: Error) => {
            throw error;
        });
}
