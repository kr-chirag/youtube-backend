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

videoRouter.use(checkAuth);

videoRouter.post("/", uploadSingleFiles("video"), handlePostVideo);
videoRouter.route("/:videoId").get(handleGetVideo).delete(handleDeleteVideo);
videoRouter
    .route("/:videoId/like")
    .post(handlePostLike)
    .delete(handleDeleteLike);

export default videoRouter;
