module.exports = {
  apps: [
    {
      name: 'careercare',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/ubuntu/CAREER',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/log/careercare/error.log',
      out_file: '/var/log/careercare/out.log',
      merge_logs: true,
      autorestart: true,
      watch: false,
    },
  ],
};
