# To start the server using forever with watch mode enabled:
>forever start bin/run.js --watch

# To start the server in fork mode using pm2:  
>pm2 start server.js --name="[servername]" -- [PORT]  
#### For example:  
>pm2 start server.js --name="server1" --watch -- 8081

# To start the server in cluster mode using pm2:  
>pm2 start server.js --name="[servername]" --watch -i max -- [PORT]  
#### For example:  
>pm2 start server.js --name="server2" --watch -i max -- 8082

# As npm scripts:  
### Fork mode:
>npm run pm2-fork
### Cluster mode:
>npm run pm2-cluster

# To set up listeners on different ports to be handled by Nginx (see nginx config file for details):
>pm2 start bin/run.js --name="server1" --watch  
>node bin/run.js -- -p 8081 -m cluster  
>pm2 start bin/run.js --name="server3" --watch  
>pm2 start bin/run.js --name="server4" --watch  
>pm2 start bin/run.js --name="server5" --watch  
>pm2 start bin/run.js --name="server6" --watch 
