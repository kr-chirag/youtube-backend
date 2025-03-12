import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${req.userId}-${file.originalname}`);
    },
});

const uploader = multer({ storage });

export function uploadSingleFiles(filesName: string) {
    return uploader.single(filesName);
}
