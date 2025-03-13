import express from "express";
import {
    handleDeleteLike,
    handleDeleteVideo,
    handleGetVideo,
    handlePostLike,
    handlePostVideo,
} from "../controllers/video.controller";
import { uploadSingleFiles } from "../middlewares/file.middleware";
import { checkAuth } from "../middlewares/auth.middleware";

const videoRouter = express.Router();

videoRouter.post("/", checkAuth, uploadSingleFiles("video"), handlePostVideo);
videoRouter
    .route("/:videoId")
    .get(handleGetVideo)
    .delete(checkAuth, handleDeleteVideo);
videoRouter
    .route("/:videoId/like")
    .post(checkAuth, handlePostLike)
    .delete(checkAuth, handleDeleteLike);

export default videoRouter;
