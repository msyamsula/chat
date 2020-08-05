export default class writeChat {
  constructor(socket) {
    this.socket = socket;
    this.textBox = document.querySelector(".text-box");
    this.textBox.focus();
    this.events();
  }

  events() {
    this.textBox.addEventListener("keypress", (e) => {
      console.log(e);
      if (e.key === "Enter") {
        this.sendMessage(this.textBox.value);
      }
    });
  }

  sendMessage(text) {
    console.log(this.socket);
    this.textBox.value = "";
    this.textBox.focus();
    this.socket.emit("message-to-server", { data: text });
  }
}
