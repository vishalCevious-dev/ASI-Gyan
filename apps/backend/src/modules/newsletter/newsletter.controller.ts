import { Request, Response } from "express";
import { db } from "src/config/db";
import { NewsletterSubscribers } from "src/model/newsletter.model";
import { eq } from "drizzle-orm";
import { ApiResponse } from "src/utils/ApiResponse";
import asyncHandler from "src/utils/asyncHandler";
import { sendNewsletterNotification } from "src/utils/sendMail";

// Subscribe to newsletter
export const subscribeNewsletter = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, name } = req.body;

    // Check if email already exists
    const existingSubscriber = await db
      .select()
      .from(NewsletterSubscribers)
      .where(eq(NewsletterSubscribers.email, email))
      .limit(1);

    if (existingSubscriber.length > 0) {
      if (existingSubscriber[0].isActive) {
        return res
          .status(400)
          .json(ApiResponse(400, null, "Email already subscribed to newsletter"));
      } else {
        // Reactivate subscription
        await db
          .update(NewsletterSubscribers)
          .set({
            isActive: true,
            name: name || existingSubscriber[0].name,
            subscribedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .where(eq(NewsletterSubscribers.id, existingSubscriber[0].id));

        return res
          .status(200)
          .json(ApiResponse(200, null, "Newsletter subscription reactivated"));
      }
    }

    // Create new subscription
    const newSubscriber = await db
      .insert(NewsletterSubscribers)
      .values({
        email,
        name: name || null,
        isActive: true,
        subscribedAt: new Date().toISOString(),
      })
      .returning();

    // Send welcome email
    const welcomeHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Welcome to AI Intelligence Newsletter!</h2>
        <p>Hi ${name || "there"},</p>
        <p>Thank you for subscribing to our AI Intelligence Newsletter. You'll now receive:</p>
        <ul>
          <li>🚀 Latest AI breakthroughs and research</li>
          <li>💡 Industry insights and career tips</li>
          <li>🎯 Exclusive course updates and early access</li>
          <li>📊 Weekly AI market trends analysis</li>
          <li>🔬 Expert interviews and thought leadership</li>
          <li>💼 Job opportunities in AI field</li>
        </ul>
        <p>We're excited to have you on board!</p>
        <p>Best regards,<br>AI Intelligence Team</p>
      </div>
    `;

    try {
      await sendNewsletterNotification(
        email,
        name,
        "Welcome to AI Intelligence Newsletter!",
        welcomeHtml
      );
    } catch (error) {
      console.error("Error sending welcome email:", error);
      // Don't fail the subscription if email fails
    }

    return res
      .status(201)
      .json(ApiResponse(201, newSubscriber[0], "Successfully subscribed to newsletter"));
  }
);

// Unsubscribe from newsletter
export const unsubscribeNewsletter = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const subscriber = await db
      .select()
      .from(NewsletterSubscribers)
      .where(eq(NewsletterSubscribers.email, email))
      .limit(1);

    if (subscriber.length === 0) {
      return res
        .status(404)
        .json(ApiResponse(404, null, "Email not found in newsletter subscribers"));
    }

    if (!subscriber[0].isActive) {
      return res
        .status(400)
        .json(ApiResponse(400, null, "Email is already unsubscribed"));
    }

    await db
      .update(NewsletterSubscribers)
      .set({
        isActive: false,
        unsubscribedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(NewsletterSubscribers.id, subscriber[0].id));

    return res
      .status(200)
      .json(ApiResponse(200, null, "Successfully unsubscribed from newsletter"));
  }
);

// Get all active subscribers (admin only)
export const getAllSubscribers = asyncHandler(
  async (_req: Request, res: Response) => {
    const subscribers = await db
      .select()
      .from(NewsletterSubscribers)
      .where(eq(NewsletterSubscribers.isActive, true))
      .orderBy(NewsletterSubscribers.createdAt);

    return res
      .status(200)
      .json(ApiResponse(200, subscribers, "Subscribers retrieved successfully"));
  }
);

// Get subscriber count
export const getSubscriberCount = asyncHandler(
  async (_req: Request, res: Response) => {
    const subscribers = await db
      .select()
      .from(NewsletterSubscribers)
      .where(eq(NewsletterSubscribers.isActive, true));

    return res
      .status(200)
      .json(ApiResponse(200, { count: subscribers.length }, "Subscriber count retrieved successfully"));
  }
);
