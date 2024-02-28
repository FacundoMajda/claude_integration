import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

interface MulterFile extends Express.Multer.File {}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const filtro = (req: Request, file: MulterFile, cb: FileFilterCallback) => {
    const tipos = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/csv',
        'text/plain',
        'text/html',
        'application/vnd.oasis.opendocument.text',
        'application/rtf',
        'application/epub+zip'
    ];

    if (tipos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10, 
        files: 5
    },
    fileFilter: filtro
});