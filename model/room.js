class Room {
  constructor(id, name, namespace, isPrivate = false) {
    this.id = id;
    this.name = name;
    this.namespace = namespace;
    this.isPrivate = isPrivate;
    this.history = [];
  }

  addMessage(message) {
    this.history.push(message);
  }

  clearHistory() {
    this.history = [];
  }
}

module.exports = Room;
