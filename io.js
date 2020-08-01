// server side io
const socketio = require("socket.io");
let appServer = require("./app");

const httpServer = require("http").createServer(appServer);
httpServer.listen(5000);
const io = socketio(httpServer);

const namespaces = require("./network");

io.on("connect", (socket) => {
  socket.emit("server-send-namespace", { data: namespaces });
});

namespaces.forEach((ns) => {
  io.of(ns.endpoint).on("connect", (socket) => {
    console.log(socket.id);
    socket.emit(`welcome-to-${ns.name}`, `welcome-to-${ns.name}`);
    socket.emit("joinRoom", ns.name, (newMember) => {});
  });
});
