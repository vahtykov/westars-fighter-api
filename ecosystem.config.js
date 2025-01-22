module.exports = {
  apps: [{
    name: 'fighter-api',
    script: './dist/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}