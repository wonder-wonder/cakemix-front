start:
		npm run build
		npm run generate
		npm run start
splash:
		./node_modules/pwa-asset-generator/bin/cli ./static/icon.png ./static/splash/ --path-override "/splash" --background "#070604"