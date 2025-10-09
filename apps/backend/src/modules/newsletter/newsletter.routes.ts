import { Router } from "express";
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
  getSubscriberCount,
} from "./newsletter.controller";
import { validateBody } from "../../middlewares/validateBody.middleware";
import { subscribeNewsletterSchema, unsubscribeNewsletterSchema } from "../../validation/newsletter.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { UserRole } from "../../constants";

const router = Router();

// Public routes
router.post(
  "/subscribe",
  validateBody(subscribeNewsletterSchema),
  subscribeNewsletter
);

router.post(
  "/unsubscribe",
  validateBody(unsubscribeNewsletterSchema),
  unsubscribeNewsletter
);

// Admin routes
router.get(
  "/subscribers",
  authMiddleware,
  rbac(UserRole.Admin),
  getAllSubscribers
);

router.get(
  "/count",
  getSubscriberCount
);

export { router as NewsletterRouter };
