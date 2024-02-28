import { upload } from '../config/multer';

export const uploadMiddleware = (req: any, res: any, next: any) => {
    upload.single('file')(req, res, function (err) {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            next();
        }
    });
};