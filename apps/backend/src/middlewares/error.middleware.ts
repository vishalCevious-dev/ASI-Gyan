import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("Error details:", err);
  console.error("Error stack:", err.stack);
  
  // In development, show more details
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(500).json({ 
      message: "Internal Server Error",
      error: err.message,
      stack: err.stack
    });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
