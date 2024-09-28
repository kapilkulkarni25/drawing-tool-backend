const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:5000' : 'drawing-tool-5onfyisu8-kapils-projects-50cafee3.vercel.app'
app.use(cors({ origin: URL }))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL });

io.on("connection", (socket) => {
    console.log("server connected")

    socket.on('beginPath', (arg) => {
        socket.broadcast.emit('beginPath', arg)
    })

    socket.on('drawLine', (arg) => {
        socket.broadcast.emit('drawLine', arg)
    })

    socket.on('changeConfig', (arg) => {
        socket.broadcast.emit('changeConfig', arg)
    })
});

httpServer.listen(5000);