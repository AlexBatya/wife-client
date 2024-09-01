module.exports = {
	apps: [
		{
			name: 'webpack-dev-server',
			script: 'npx',
			args: 'webpack serve --mode development',
			cmd: './',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'development'
			}
		}
	]
}
