exports.joinRoom = (roomSocket, roomName) => {
  const callback = (totalMember) => {
    let chatTab = document.querySelector(".chat");
    chatTab.insertAdjacentHTML("beforeend", `<div>${totalMember}</div>`);
  };
  roomSocket.emit("join-room", { data: roomName }, callback);
};
