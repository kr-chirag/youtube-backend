import { Request, Response } from "express-serve-static-core";
import { deleteVideo, getVideo, insertVideo } from "../services/video.service";
import fs from "fs";
import { deleteLike, getLike, insertLike } from "../services/like.service";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";

export async function handlePostVideo(
    req: Request<
        {},
        {},
        {
            title: string;
            description?: string;
        }
    >,
    res: Response
) {
    if (!req.file) {
        res.sendStatus(400);
        return;
    }
    try {
        const { title, description } = req.body;
        const url = await uploadToCloudinary(req.file.path);
        const video = await insertVideo(title, url, req.userId, description);
        fs.unlinkSync(req.file.path);
        res.status(201).json({ status: "success", video });
    } catch (err) {
        res.status(500).json({ err });
    }
}

export async function handleGetVideo(
    req: Request<{ videoId: string }>,
    res: Response
) {
    const video = await getVideo(req.params.videoId);
    res.status(200).json({ status: "success", video });
}
export async function handleDeleteVideo(
    req: Request<{ videoId: string }>,
    res: Response
) {
    const deletedVideo = await deleteVideo(req.params.videoId);
    if (deletedVideo) await deleteFromCloudinary(deletedVideo.url);
    res.status(200).json({
        status: "success",
        deletedVideoId: req.params.videoId,
    });
}
export async function handlePostLike(
    req: Request<{ videoId: string }>,
    res: Response
) {
    const alreadyLiked = await getLike(req.params.videoId, req.userId);
    if (alreadyLiked) {
        res.status(200).json({
            status: "success",
            message: "already liked",
            alreadyLiked,
        });
        return;
    }
    const like = await insertLike(req.params.videoId, req.userId);
    res.status(200).json({ status: "success", like });
}
export async function handleDeleteLike(req: Request, res: Response) {
    await deleteLike(req.params.videoId, req.userId);
    res.status(200).json({
        status: "success",
        meaase: "like removed",
        videoId: req.params.videoId,
    });
}
