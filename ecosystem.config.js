/**
 * PM2 ecosystem configuration for ASI Gyan backend
 *
 * Usage:
 *   # build backend first
 *   pnpm -C apps/backend build
 *
 *   # start in production mode using env from apps/backend/.env
 *   pm2 start ecosystem.config.js --env production
 *
 *   # helpful commands
 *   pm2 status
 *   pm2 logs asi-gyan-backend --lines 100
 *   pm2 restart asi-gyan-backend
 *   pm2 save && pm2 startup
 */

module.exports = {
  apps: [
    {
      name: 'asi-gyan-backend',
      cwd: 'apps/backend',
      script: 'dist/index.js',
      interpreter: 'node',
      exec_mode: 'fork', // set to 'cluster' and adjust instances if desired
      instances: 1,
      watch: false,
      autorestart: true,
      max_restarts: 10,
      env_file: '.env', // loads apps/backend/.env
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

