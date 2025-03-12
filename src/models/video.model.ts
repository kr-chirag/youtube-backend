import { Schema, model } from "mongoose";
import User from "./user.model";

const videoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        likes: [{ type: Schema.Types.ObjectId, ref: "like" }],
    },
    {
        timestamps: true,
    }
);

videoSchema.post("save", function () {
    User.findOneAndUpdate(
        { _id: this.createdBy },
        {
            $push: {
                videos: this.id,
            },
        }
    ).exec();
});

const Video = model("video", videoSchema);

export default Video;
