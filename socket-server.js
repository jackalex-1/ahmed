const ws = require('websocket').server;
const http = require('http');

const server = http.createServer((req , res) => {
    console.log(`${(new Date())} + ' Received request for ' + ${req.url}`);
    res.writeHead(200 , "OK");
    res.end();
}).listen(8080 , () => {
    console.log(`Http server is running on port 8080`);
});

const webSocketServer = new ws({
    httpServer: server,
    autoAcceptConnections: false
});

webSocketServer.on('request' , (req) => {
    console.log(`Request Received : ${req.host}`);

    const connection = req.accept('echo-protocol' , '*');

    connection.on('message' , (data) => {
        console.log(`data : ${JSON.stringify(data)}` );
    });

    connection.on('close' , (reasonCode, description) => {
        console.log(`Connection closed , Reason : ${reasonCode} , Description : ${description}`);
    })
})