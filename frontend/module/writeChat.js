export default class writeChat {
  constructor(nsSocket) {
    this.nsSocket = nsSocket;
    this.textBox = document.querySelector(".text-box");
    this.textBox.focus();
    this.events();
  }

  events() {
    this.textBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage(this.textBox.value);
      }
    });
  }

  sendMessage(text) {
    this.textBox.value = "";
    this.textBox.focus();
    this.nsSocket.emit("message-to-server", { data: text });
  }
}
