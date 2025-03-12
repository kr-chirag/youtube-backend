import { Schema, model } from "mongoose";
import Video from "./video.model";

const likeSchema = new Schema(
    {
        videoId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "video",
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

likeSchema.index({ videoId: 1, userId: 1 }, { unique: true });
likeSchema.post("save", async function () {
    await Video.findOneAndUpdate(
        { _id: this.videoId },
        {
            $push: {
                likes: this.id,
            },
        }
    );
});

const Like = model("like", likeSchema);

export default Like;
