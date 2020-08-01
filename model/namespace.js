class Namespace {
  constructor(id, name, endpoint) {
    this.id = id;
    this.name = name;
    this.endpoint = endpoint;
    this.rooms = [];
  }

  addRoom(room) {
    this.rooms.push(room);
  }
}

module.exports = Namespace;
