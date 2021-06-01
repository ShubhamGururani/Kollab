const express = require('express');
const routesHandler = require('./routes/handler');
const db = require('./config/mongoose');
const User = require('./models/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     next();
// });

app.use(cookieParser());
app.use(express.json());

app.use('/', routesHandler);



const PORT = process.env.PORT || 8000; //backend routing port


const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});
let state = {

};
io.on("connection", (socket) => {
    // console.log("socket id is",socket.id);
    const { id } = socket.client;
    // console.log('client in this are of ids',id);

    socket.on('disconnect', function () {
        console.log('socket disconnected!');
    });
    socket.on('join_room', function (data) {
        console.log('joining request rec.', data);

        socket.join(data.room);

        io.in(data.room).emit('user_joined', data);
    });
    socket.on('send_code', function (data) {
        // console.log(data);
        io.in(data.room).emit('receive_code', data);
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});