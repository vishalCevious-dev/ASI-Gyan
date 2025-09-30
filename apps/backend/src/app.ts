import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "src/middlewares/error.middleware";
import apiRoutes from "src/modules/index.routes";
import helmet from "helmet";
import path from "node:path";
import EnvSecret from "./constants/envVariables";

const app: Application = express();

const corsOptions: CorsOptions = {
  origin: [
    EnvSecret.BASE_URL, 
    "https://asigyan.com",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:3001"
  ],
  credentials: true,
};

// Use production uploads folder when serving files
const uploadsDir =
  EnvSecret.NODE_ENV === "PRODUCTION"
    ? "/home/ubuntu/asigyan-uploads"
    : path.join(__dirname, "..", "public", "uploads");

// Use middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static(uploadsDir, {
  setHeaders: (res, path) => {
    // Set correct Content-Type headers for video files
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
    if (path.endsWith('.webm')) {
      res.setHeader('Content-Type', 'video/webm');
    }
    if (path.endsWith('.ogg')) {
      res.setHeader('Content-Type', 'video/ogg');
    }
    if (path.endsWith('.avi')) {
      res.setHeader('Content-Type', 'video/x-msvideo');
    }
    if (path.endsWith('.mov')) {
      res.setHeader('Content-Type', 'video/quicktime');
    }
    if (path.endsWith('.wmv')) {
      res.setHeader('Content-Type', 'video/x-ms-wmv');
    }
    if (path.endsWith('.flv')) {
      res.setHeader('Content-Type', 'video/x-flv');
    }
    if (path.endsWith('.mkv')) {
      res.setHeader('Content-Type', 'video/x-matroska');
    }
    // Set correct Content-Type headers for image files
    if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
    if (path.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    }
    if (path.endsWith('.gif')) {
      res.setHeader('Content-Type', 'image/gif');
    }
    if (path.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/webp');
    }
    if (path.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
  }
}));

// Routes
app.use("/api/v1", apiRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
