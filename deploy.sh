git pull
yarn run build
pm2 delete "smart-business-web"
pm2 start npm --name "smart-business-web" -- start
