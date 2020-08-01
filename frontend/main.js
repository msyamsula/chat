// client side io
const io = require("socket.io-client");
const url = "http://localhost:5000";

const socket = io(url);
let roomSocket;

socket.on("server-send-namespace", (message) => {
  let nsHTML = document.querySelector(".namespaces");
  nsHTML.innerHTML = "";
  let namespaces = message.data;
  console.log(namespaces);
  namespaces.forEach((ns) => {
    nsHTML.insertAdjacentHTML(
      "beforeend",
      `<li id=ns-${ns.id}>${ns.name}</li>`
    );
    let nsId = document.getElementById(`ns-${ns.id}`);
    nsId.addEventListener("click", (event) => {
      event.preventDefault();
      let roomHTML = document.querySelector(".rooms");
      roomHTML.innerHTML = "";
      const nsRoomList = ns.rooms;
      nsRoomList.forEach((room) => {
        roomHTML.insertAdjacentHTML(
          "beforeend",
          `<li id=room-${room.id}>${room.name}</li>`
        );
        let roomId = document.getElementById(`room-${room.id}`);
        roomId.addEventListener("click", (event) => {
          event.preventDefault();
          // console.log(room.id);
          let chatHTML = document.querySelector(".chat");
          // console.log(chatHTML);
          chatHTML.innerHTML = `I'm currently choosing room ${room.name}`;
          // console.log(ns.endpoint);
          roomSocket = io(`${url}${ns.endpoint}`);
          roomSocket.on(`welcome-to-${ns.name}`, (data) => {
            console.log(data);
          });
          // console.log(room.name);
          joinRoom(room.name);
          // console.log(roomSocket);
        });
      });
    });
  });
});
