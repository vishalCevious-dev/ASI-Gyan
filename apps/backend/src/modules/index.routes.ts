import { Router } from "express";
import { AuthRouter } from "src/modules/auth/auth.routes";
import { BlogRouter } from "src/modules/blog/blog.routes";
import { AiRouter } from "src/modules/ai/openai.routes";
import { GalleryRouter } from "src/modules/gallery/gallery.routes";

const router = Router();

router.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/auth", AuthRouter);
router.use("/blog", BlogRouter);
router.use("/ai", AiRouter);
router.use("/gallery", GalleryRouter);

export default router;
