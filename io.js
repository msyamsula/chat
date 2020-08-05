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
  io.of(ns.endpoint).on("connect", (nsSocket) => {
    nsSocket.emit(`welcome-to-${ns.name}`, `welcome-to-${ns.name}`);
    nsSocket.on("join-room", (message, joinCallback) => {
      // join room
      nsSocket.join(message.data);

      // find current room object/model
      const currentRoom = ns.rooms.filter((room) => {
        return room.name == message.data;
      });

      io.of(ns.endpoint)
        .in(message.data)
        .clients((err, clients) => {
          // joinCallback(clients.length);

          let totalMember = clients.length;
          io.of(ns.endpoint)
            .to(message.data)
            .emit("new-user", { data: totalMember });
        });
      nsSocket.emit("catch-history", { data: currentRoom[0].history });
    });
    nsSocket.on("message-to-server", (message) => {
      // find room name from socket.rooms
      const roomName = Object.keys(nsSocket.rooms)[1];
      // find current room object/model
      const currentRoom = ns.rooms.filter((room) => {
        return room.name == roomName;
      });
      // push data to currentRoom history
      currentRoom[0].addMessage(message.data);
      // send to room
      io.of(ns.endpoint)
        .to(roomName)
        .emit("message-from-server", { data: message.data });
    });
    nsSocket.on("leave-room", (message) => {
      const currentRoom = Object.keys(nsSocket.rooms)[1];

      // leave room
      nsSocket.leave(currentRoom);
      io.of(ns.endpoint)
        .in(currentRoom)
        .clients((err, clients) => {
          // enter room and publish to all room about user left
          io.of(ns.endpoint)
            .to(currentRoom)
            .emit("leave-room", { data: clients.length });
        });
    });
  });
});
