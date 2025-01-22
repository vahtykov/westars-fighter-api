module.exports = {
  apps: [{
    name: 'fighter-api',
    script: '/usr/bin/docker',
    args: 'compose -f docker-compose.app.yml up',
    interpreter: 'none',
    env: {
      NODE_ENV: 'development',
    },
    max_memory_restart: '500M',
    restart_delay: 3000,
    watch: false,
  }]
};