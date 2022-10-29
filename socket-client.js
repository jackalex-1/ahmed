const wsClient = require('websocket').client;

const client = new wsClient();

client.on('connectFailed', function(error) {
    console.log('[CLIENT] Connect Error: ' + error.toString());
});


client.on('connect' , (conn) => {
    console.log(`[CLIENT] Connection Established`);

    conn.on('error' , (err) => {
        console.log(`[CLIENT] error connection : ${err}`);
    });

    conn.on('close' , (code , desc) => {
        console.log(`[CLIENT] Connection closed. Reason code : ${code} , Description : ${desc}`);
    });

    function sendMessage(){
        if(conn.connected){
            let message = "Whats up server";
            conn.sendUTF(message);
            console.log(`[CLIENT] message Sent to Server`);
        }else{
            console.log(`[CLIENT] Message not sent to server`);
        }
    }

    setTimeout(() => {
        sendMessage()
    } , 5000);
});




client.on('httpResponse' , (res , client) => {
    console.log(`[CLIENT] Response : ${res} , client : ${client}`);
})

client.connect('ws://localhost:8080', 'echo-protocol')