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

  // ✅ Use /home/ubuntu/uploads in production, public/<folder> in dev
  const destinationRoot =
    process.env.NODE_ENV === "production"
      ? path.resolve("/home/ubuntu", folder)
      : path.resolve(__dirname, "..", "..", "public", folder);

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
      return cb(
        new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname),
      );
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

// Pre-configured helpers
export const uploadBlogImage = makeImageUploader({
  folder: path.join("uploads", "blog"),
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

// Convert a public URL or "/uploads/..." path to an absolute filesystem path under the compiled public dir
export function resolvePublicFilePath(urlOrPath: string): string | null {
  try {
    const publicRoot = path.resolve(__dirname, "..", "..", "public");
    let pathname = urlOrPath;

    // If a full URL, extract pathname
    if (/^https?:\/\//i.test(urlOrPath)) {
      try {
        const u = new URL(urlOrPath);
        pathname = u.pathname;
      } catch {
        // fall back to raw string
      }
    }

    // Ensure leading slash removed for joining
    const rel = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    const abs = path.resolve(publicRoot, rel);
    // Prevent path traversal outside public
    if (!abs.startsWith(publicRoot)) return null;
    return abs;
  } catch {
    return null;
  }
}
