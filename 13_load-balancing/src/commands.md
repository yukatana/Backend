In order to start the server in fork mode using pm 2, the command structure is as follows:

pm2 start server.js --name="[servername]" -- [PORT]

For example:  
pm2 start server.js --name="server1" --watch -- 8081

To start the server in cluster mode using pm2, run the following commands:

pm2 start server.js --name="[servername]" --watch -i max -- [PORT]

For example:  
pm2 start server.js --name="server2" --watch -i max -- 8082
