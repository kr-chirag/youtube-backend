import { Schema, model, Document } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        videos: [{ type: Schema.Types.ObjectId, ref: "video" }],
    },
    {
        timestamps: true,
    }
);

const User = model("user", userSchema);

export default User;
