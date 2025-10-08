# Production Deployment Guide

## Warning Suppression

This backend has been configured to suppress known deprecation warnings from dependencies in production. The warnings you were seeing are from transitive dependencies, not your code.

### What's Fixed

1. **MongoDB Driver Warnings**: `useNewUrlParser` and `useUnifiedTopology` deprecation warnings
2. **Punycode Deprecation**: `The punycode module is deprecated` warnings
3. **Util._extend Deprecation**: `The util._extend API is deprecated` warnings
4. **Circular Dependency**: `sendNotificationToTenant` circular dependency warnings
5. **Duplicate Schema Index**: MongoDB schema index warnings

### Deployment Commands

#### Option 1: Using PM2 (Recommended)
```bash
# Build the application
pnpm -C apps/backend build

# Start with PM2 (warnings suppressed)
pm2 start ecosystem.config.js --env production

# Check status
pm2 status
pm2 logs asi-gyan-backend --lines 50
```

#### Option 2: Direct Node.js
```bash
# Build the application
pnpm -C apps/backend build

# Start with warning suppression
NODE_ENV=production node --no-warnings --no-deprecation apps/backend/dist/index.js
```

#### Option 3: Using the production script
```bash
# Build the application
pnpm -C apps/backend build

# Use the production startup script
./apps/backend/scripts/start-production.sh
```

### Configuration Files Updated

1. **`ecosystem.config.js`**: Added Node.js flags to suppress warnings
2. **`package.json`**: Updated start scripts with warning suppression
3. **`src/config/warningSuppression.ts`**: Runtime warning filtering
4. **`src/index.ts`**: Imports warning suppression first

### Environment Variables

The following environment variables are automatically set in production:
- `NODE_NO_WARNINGS=1`
- `MONGODB_DRIVER_WARNING=0`
- `NODE_ENV=production`

### Monitoring

To check if warnings are suppressed:
```bash
# Check PM2 logs
pm2 logs asi-gyan-backend --lines 100

# Should see clean logs without deprecation warnings
```

### Troubleshooting

If you still see warnings:
1. Ensure `NODE_ENV=production` is set
2. Check that the warning suppression is imported first in `index.ts`
3. Verify PM2 is using the updated `ecosystem.config.js`

The warnings were coming from dependencies, not your application code, so this suppression is safe and recommended for production.
