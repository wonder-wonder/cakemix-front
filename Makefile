start:
		npm run build
		npm run generate
		npm run start
splash:
		npx pwa-asset-generator ./static/icon.png ./static/splash/ --path-override "/splash" --background "#070604"