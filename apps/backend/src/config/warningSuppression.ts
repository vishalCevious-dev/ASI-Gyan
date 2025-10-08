/**
 * Warning suppression configuration for production
 * This file suppresses known deprecation warnings from dependencies
 */

// Only apply suppression in production
if (process.env.NODE_ENV === 'production') {
  // Suppress specific Node.js warnings
  process.removeAllListeners('warning');

  // Override console.warn to filter out known deprecation warnings
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    
    // Filter out known deprecation warnings
    const suppressedWarnings = [
      'useNewUrlParser is a deprecated option',
      'useUnifiedTopology is a deprecated option',
      'The `punycode` module is deprecated',
      'The `util._extend` API is deprecated',
      'Duplicate schema index',
      'Accessing non-existent property',
      'sendNotificationToTenant',
      'MONGODB DRIVER',
      'MONGOOSE',
      'DEP0040',
      'DEP0060'
    ];
    
    const shouldSuppress = suppressedWarnings.some(warning => 
      message.includes(warning)
    );
    
    if (!shouldSuppress) {
      originalWarn.apply(console, args);
    }
  };

  // Suppress specific warnings by setting environment variables
  process.env.NODE_NO_WARNINGS = '1';
  process.env.MONGODB_DRIVER_WARNING = '0';
  
  // Suppress stderr warnings
  const originalStderr = process.stderr.write;
  process.stderr.write = function(chunk: any, encoding?: any, callback?: any) {
    const message = chunk.toString();
    const suppressedWarnings = [
      'useNewUrlParser is a deprecated option',
      'useUnifiedTopology is a deprecated option',
      'The `punycode` module is deprecated',
      'The `util._extend` API is deprecated',
      'Duplicate schema index',
      'Accessing non-existent property',
      'sendNotificationToTenant',
      'MONGODB DRIVER',
      'MONGOOSE',
      'DEP0040',
      'DEP0060'
    ];
    
    const shouldSuppress = suppressedWarnings.some(warning => 
      message.includes(warning)
    );
    
    if (shouldSuppress) {
      return true; // Suppress the warning
    }
    
    return originalStderr.call(this, chunk, encoding, callback);
  };
}

export {};
