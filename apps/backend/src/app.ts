import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "src/middlewares/error.middleware";
import apiRoutes from "src/modules/index.routes";
import helmet from "helmet";
import path from "node:path";

const app: Application = express();

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
  ],
  credentials: true,
};


// Serve uploads directory correctly in both local and production
const uploadsDir =
  process.env.NODE_ENV === "production"
    ? "/home/ubuntu/uploads"
    : path.join(__dirname, "..", "public", "uploads");

// Use middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api/v1", apiRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
