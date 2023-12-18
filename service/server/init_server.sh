npm install --prefix srcs

# npm run --prefix srcs start:debug
npm run --prefix srcs build
npm run --prefix srcs start
# pm2 start srcs/dist/main.js --name server

bash