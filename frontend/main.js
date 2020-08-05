// client side io
const io = require("socket.io-client");
const joinRoom = require("./utility").joinRoom;
// const writeChat = require("./module/writeChat");
import writeChat from "./module/writeChat";

const url = "http://localhost:5000";
const socket = io(url);
let roomSocket;

socket.on("server-send-namespace", (message) => {
  // namespace tab
  let nsHTML = document.querySelector(".namespaces");
  nsHTML.innerHTML = "";
  let namespaces = message.data;
  console.log(namespaces);

  // insert html to namespace tab
  namespaces.forEach((ns) => {
    nsHTML.insertAdjacentHTML(
      "beforeend",
      `<li id=ns-${ns.id}>${ns.name}</li>`
    );

    // add event listener
    let nsId = document.getElementById(`ns-${ns.id}`);
    nsId.addEventListener("click", (event) => {
      event.preventDefault();

      // room tab
      let roomHTML = document.querySelector(".rooms");
      roomHTML.innerHTML = "";
      const nsRoomList = ns.rooms;

      // insert html to room tab based on clicked namespace
      nsRoomList.forEach((room) => {
        roomHTML.insertAdjacentHTML(
          "beforeend",
          `<li id=room-${room.id}>${room.name}</li>`
        );

        // add event listener to each room
        let roomId = document.getElementById(`room-${room.id}`);
        roomId.addEventListener("click", (event) => {
          event.preventDefault();

          // connect to current namspace
          if (roomSocket) {
            roomSocket.close();
          }
          // grab chat tab and add current room to HTML
          let chatHTML = document.querySelector(".chat");
          chatHTML.innerHTML = `<div>Current room: ${room.name}</div>`;

          // add input text
          chatHTML.insertAdjacentHTML(
            "beforeend",
            `<input type="text" class="text-box" />`
          );

          // add textBox object
          roomSocket = io(`${url}${ns.endpoint}`);
          let textBox = new writeChat(roomSocket);

          roomSocket.on(`welcome-to-${ns.name}`, (data) => {
            // join room
            joinRoom(roomSocket, room.name);
          });

          roomSocket.on("message-from-server", (message) => {
            console.log(message.data);
            let chatdiv = document.querySelector(".chat");
            chatdiv.insertAdjacentHTML(
              "beforebegin",
              `<div>${message.data}</div>`
            );
          });
        });
      });
    });
  });
});
