import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure upload folders exist
const ensureFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// ---------------- IMAGE UPLOAD ----------------
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/images";
    ensureFolder(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "");
    cb(null, uniqueName);
  },
});

// Filter images
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images are allowed!"), false);
};

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
});

// ---------------- VIDEO UPLOAD ----------------
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/videos";
    ensureFolder(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "");
    cb(null, uniqueName);
  },
});

// Filter videos
const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) cb(null, true);
  else cb(new Error("Only video files are allowed!"), false);
};

export const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
});
