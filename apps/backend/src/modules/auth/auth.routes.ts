import { Router } from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "src/modules/auth/auth.controller";
import { authMiddleware } from "src/middlewares/auth.middleware";
import asyncHandler from "src/utils/asyncHandler";
import { validateBody } from "src/middlewares/validateBody.middleware";
import { loginSchema, registerSchema } from "src/validation/auth.validation";

const router = Router();

router
  .route("/register")
  .post(validateBody(registerSchema), asyncHandler(register));
router.route("/login").post(validateBody(loginSchema), asyncHandler(login));
router.route("/me").get(authMiddleware, asyncHandler(getMe));
router.route("/logout").post(authMiddleware, asyncHandler(logout));

export { router as AuthRouter };
