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
    socket.emit(`welcome-to-${ns.name}`, `welcome-to-${ns.name}`);
    socket.on("join-room", (message, joinCallback) => {
      socket.join(message.data);
      io.of(ns.endpoint)
        .in(message.data)
        .clients((err, clients) => {
          joinCallback(clients.length);
        });
    });
    socket.on("message-to-server", (message) => {
      io.of(ns.endpoint).emit("message-from-server", { data: message.data });
    });
  });
});
