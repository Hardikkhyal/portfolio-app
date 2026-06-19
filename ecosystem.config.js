module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/ubuntu/app',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/home/ubuntu/logs/portfolio-error.log',
      out_file: '/home/ubuntu/logs/portfolio-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
