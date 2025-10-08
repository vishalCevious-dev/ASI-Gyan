import { Router } from "express";
import { AuthRouter } from "./auth/auth.routes";
import { BlogRouter } from "./blog/blog.routes";
import { AiRouter } from "./ai/openai.routes";
import { GalleryRouter } from "./gallery/gallery.routes";
import { NewsletterRouter } from "./newsletter/newsletter.routes";
import { CourseRoutes } from "./courses/courses.route";

const router = Router();

router.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/auth", AuthRouter);
router.use("/blog", BlogRouter);
router.use("/ai", AiRouter);
router.use("/gallery", GalleryRouter);
router.use("/newsletter", NewsletterRouter);
router.use("/letter", NewsletterRouter);
router.use("/courses", CourseRoutes);

export default router;
