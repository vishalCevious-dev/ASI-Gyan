import { Router } from "express";
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
  getSubscriberCount,
} from "src/modules/newsletter/newsletter.controller";
import { validateBody } from "src/middlewares/validateBody.middleware";
import { subscribeNewsletterSchema, unsubscribeNewsletterSchema } from "src/validation/newsletter.validation";
import { authMiddleware } from "src/middlewares/auth.middleware";
import { rbac } from "src/middlewares/rbac.middleware";
import { UserRole } from "src/constants";

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
