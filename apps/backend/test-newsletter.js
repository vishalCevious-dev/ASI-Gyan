const { db } = require('./dist/config/db.js');
const { NewsletterSubscribers } = require('./dist/model/newsletter.model.js');
const { eq } = require('drizzle-orm');

async function testNewsletter() {
  try {
    console.log('Testing database connection...');
    
    // Test database connection
    const result = await db.select().from(NewsletterSubscribers).limit(1);
    console.log('Database connection successful');
    console.log('Existing subscribers:', result.length);
    
    // Test inserting a new subscriber
    console.log('Testing insert...');
    const newSubscriber = await db
      .insert(NewsletterSubscribers)
      .values({
        email: 'test@example.com',
        name: 'Test User',
        isActive: true,
        subscribedAt: new Date().toISOString(),
      })
      .returning();
    
    console.log('Insert successful:', newSubscriber);
    
    // Clean up
    await db.delete(NewsletterSubscribers).where(eq(NewsletterSubscribers.email, 'test@example.com'));
    console.log('Cleanup successful');
    
  } catch (error) {
    console.error('Error:', error);
    console.error('Stack:', error.stack);
  }
}

testNewsletter();
