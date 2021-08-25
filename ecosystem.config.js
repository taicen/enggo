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
      env_dev: {
        "NODE_ENV": "development",
      },
      env_prod: {
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
  ]
};
