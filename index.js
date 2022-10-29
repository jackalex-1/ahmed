const { ProtocolParser , parseIMEI , Data , } = require('complete-teltonika-parser');
const express = require('express');
const app = express();

// const packet = '000000000000003608010000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000010000C7CF';

// let parsed = new ProtocolParser(packet);

// console.log(`Parsed Data : ${JSON.stringify(parsed)}`);

app.use(express.json());

app.post('/receiveData' , (req , res) => {
    let packet = req.body.packet;

    if(!packet){
        return res.status(400).json({
            message: "packet is required"
        });
    }

    const packetInfo = new ProtocolParser(packet);

    res.status(200).json({
        packet: [packetInfo]
    })
});

app.listen(8000 , () => {
    console.log(`Server is running on port ${8000}`);
})