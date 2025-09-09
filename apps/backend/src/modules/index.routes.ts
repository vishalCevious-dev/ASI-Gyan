import { Router } from "express";
import { AuthRouter } from "src/modules/auth/auth.routes";
import { BlogRouter } from "src/modules/blog/blog.routes";

const router = Router();

router.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/auth", AuthRouter);
router.use("/blog", BlogRouter);

export default router;
