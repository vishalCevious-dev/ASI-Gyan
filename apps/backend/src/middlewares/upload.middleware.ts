import path from "node:path";
import fs from "node:fs";
import multer from "multer";

type UploaderOptions = {
  folder?: string;
  fileSizeMB?: number;
  allowedMimeTypes?: string[];
};

const defaultAllowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const sanitize = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9.\- _]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export function makeImageUploader(opts: UploaderOptions = {}) {
  const folder = opts.folder ?? "uploads";
  const fileSizeMB = opts.fileSizeMB ?? 5; // 5MB default
  const allowed = opts.allowedMimeTypes ?? defaultAllowed;

  // ✅ Production: /home/ubuntu/asigyan-uploads/<folder>
  // ✅ Dev: public/uploads/<folder>
  const destinationRoot =
    process.env.NODE_ENV === "production"
      ? path.resolve("/home/ubuntu/asigyan-uploads", folder)
      : path.resolve(__dirname, "..", "..", "public", "uploads", folder);

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      fs.mkdirSync(destinationRoot, { recursive: true });
      cb(null, destinationRoot);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext);
      const stamp = Date.now();
      const fname = `${sanitize(base)}-${stamp}${ext.toLowerCase()}`;
      cb(null, fname);
    },
  });

  const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (!allowed.includes(file.mimetype)) {
      return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
    }
    cb(null, true);
  };

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: fileSizeMB * 1024 * 1024 },
  });

  return upload;
}

// Pre-configured helper for blog images
export const uploadBlogImage = makeImageUploader({
  folder: "blog",
});

export type MulterRequest = Express.Request & { file?: Express.Multer.File };

export function deleteFile(filePath: string) {
  try {
    fs.unlinkSync(filePath);
    console.log("Deleted file:", filePath);
  } catch (e) {
    console.error("Failed to delete file:", filePath, e);
  }
}

// Convert a public URL or "/uploads/..." path to an absolute filesystem path in dev
export function resolvePublicFilePath(urlOrPath: string): string | null {
  try {
    const publicRoot = path.resolve(__dirname, "..", "..", "public");
    let pathname = urlOrPath;

    if (/^https?:\/\//i.test(urlOrPath)) {
      try {
        const u = new URL(urlOrPath);
        pathname = u.pathname;
      } catch {
        // ignore invalid URL
      }
    }

    const rel = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    const abs = path.resolve(publicRoot, rel);
    if (!abs.startsWith(publicRoot)) return null; // security check
    return abs;
  } catch {
    return null;
  }
}
