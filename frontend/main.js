// client side io
const io = require("socket.io-client");
import writeChat from "./module/writeChat";

const url = "http://localhost:5000";
const socket = io(url);
let nsSocket;

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

          // grab chat tab and add current room to HTML
          let chatHTML = document.querySelector(".chat");
          let totalMember = 1;
          chatHTML.innerHTML = `<div class="room-header ${totalMember}">Current room: ${room.name}</div>
           <div class="room-member">${totalMember} active user(s)</div>`;

          // add input text
          chatHTML.insertAdjacentHTML(
            "beforeend",
            `<input type="text" class="text-box" />`
          );

          // disconnect from previous namespace
          if (nsSocket) {
            nsSocket.emit("leave-room", {});
            nsSocket.close();
          }
          // connect to current namespace
          nsSocket = io(`${url}${ns.endpoint}`);
          nsSocket.emit("join-room", { data: room.name });
          nsSocket.on("catch-history", (message) => {
            const history = message.data;
            history.forEach((text) => {
              chatHTML.insertAdjacentHTML("beforeend", `<div>${text}</div>`);
            });
          });
          nsSocket.on("new-user", (message) => {
            let roomHeaderHTML = document.querySelector(".room-header");
            let roomMemberHTML = document.querySelector(".room-member");
            totalMember = message.data;
            roomHeaderHTML.innerHTML = `Current room: ${room.name}`;
            roomMemberHTML.innerHTML = `${totalMember} active user(s)`;
          });
          nsSocket.on("leave-room", (message) => {
            let roomMemberHTML = document.querySelector(".room-member");
            totalMember = message.data;
            roomMemberHTML.innerHTML = `${totalMember} active user(s)`;
          });
          // add textBox object
          let textBox = new writeChat(nsSocket);

          // nsSocket.on(`welcome-to-${ns.name}`, (data) => {
          //   // join room
          // });

          nsSocket.on("message-from-server", (message) => {
            console.log(message.data);
            let chatdiv = document.querySelector(".chat");
            chatdiv.insertAdjacentHTML(
              "beforeend",
              `<div>${message.data}</div>`
            );
          });
        });
      });
    });
  });
});
