import Like from "../models/like.model";
import User from "../models/user.model";
import Video from "../models/video.model";

export async function insertVideo(
    title: string,
    url: string,
    createdBy: string,
    description?: string
) {
    const video = await Video.create({ title, createdBy, description, url });
    await User.findOneAndUpdate(
        { _id: video.createdBy },
        {
            $push: {
                videos: video.id,
            },
        }
    );
    return video;
}

export async function getVideo(videoId: string) {
    return await Video.findById(videoId);
}

export async function deleteVideo(videoId: string) {
    const video = await Video.findOneAndDelete({ _id: videoId });
    if (video) {
        await User.findOneAndUpdate(
            { _id: video.createdBy },
            {
                $pull: {
                    videos: videoId,
                },
            }
        );
        await Like.deleteMany({ videoId: videoId });
    }
    return video;
}
