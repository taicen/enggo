module.exports = {
  apps: [
    {
      name: 'enggo',
      exec_mode: 'cluster',
      instances: 4, // Or a number of instances
      max_memory_restart: '512M',
      watch: true,
      // script: './node_modules/nuxt/bin/nuxt.js',
      // args: 'start',
      script: './server/app.js',
      env: {
        "PORT": 3000,
        "NODE_ENV": "development",
      },
      env_production: {
        "PORT": 80,
        "NODE_ENV": "production",
      }
    },
    // {
    //   name: 'admin',
    //   script: './server/app.js',
    //   watch: true,
    //   max_memory_restart: '512M'
    //   // env: {
    //   //   "PORT": 3000,
    //   //   "NODE_ENV": "development",
    //   // },
    //   // env_production: {
    //   //   "PORT": 80,
    //   //   "NODE_ENV": "production",
    //   // }
    // },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
