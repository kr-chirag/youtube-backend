import Like from "../models/like.model";
import Video from "../models/video.model";

export async function getLike(videoId: string, userId: string) {
    return await Like.findOne({ videoId, userId });
}

export async function insertLike(videoId: string, userId: string) {
    const like = await Like.create({ videoId, userId });
    await Video.findOneAndUpdate(
        { _id: like.videoId },
        {
            $push: {
                videos: like.id,
            },
        }
    );
    return like;
}

export async function deleteLike(videoId: string, userId: string) {
    const like = await Like.findOneAndDelete({ videoId, userId });
    if (like)
        await Video.findOneAndUpdate(
            { _id: like.videoId },
            {
                $pull: {
                    likes: like.id,
                },
            }
        );
}
