#!/bin/bash

# Production startup script with warning suppression
export NODE_ENV=production
export NODE_NO_WARNINGS=1
export MONGODB_DRIVER_WARNING=0

# Start the application with warning suppression
node --no-warnings --no-deprecation dist/index.js
