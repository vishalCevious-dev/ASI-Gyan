import { db } from "../config/db";
import { NewsletterSubscribers } from "../model/newsletter.model";
import { eq } from "drizzle-orm";
import { sendBulkNewsletterNotification } from "../utils/sendMail";

export const sendNewsletterNotificationForNewContent = async (
  contentType: "blog" | "gallery" | "course",
  title: string,
  description: string,
  url: string
) => {
  try {
    // Get all active subscribers
    const subscribers = await db
      .select({
        email: NewsletterSubscribers.email,
        name: NewsletterSubscribers.name,
      })
      .from(NewsletterSubscribers)
      .where(eq(NewsletterSubscribers.isActive, true));

    if (subscribers.length === 0) {
      console.log("No active subscribers found");
      return;
    }

    // Create email content based on content type
    const subject = `New ${contentType} published: ${title}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; text-align: center;">🚀 New ${contentType.charAt(0).toUpperCase() + contentType.slice(1)} Published!</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1f2937; margin-top: 0;">${title}</h2>
          <p style="color: #6b7280; line-height: 1.6;">${description}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" 
             style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Read More
          </a>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            You're receiving this because you subscribed to our AI Intelligence Newsletter.<br>
            <a href="${process.env.BASE_URL}/unsubscribe" style="color: #10b981;">Unsubscribe</a> | 
            <a href="${process.env.BASE_URL}" style="color: #10b981;">Visit Website</a>
          </p>
        </div>
      </div>
    `;

    // Send bulk notification
    await sendBulkNewsletterNotification(subscribers, subject, html);
    
    console.log(`Newsletter notification sent to ${subscribers.length} subscribers for new ${contentType}: ${title}`);
  } catch (error) {
    console.error("Error sending newsletter notification for new content:", error);
  }
};
