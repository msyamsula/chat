// Bring in the room class
const Namespace = require("./model/namespace");
const Room = require("./model/room");

// Set up the namespaces
let namespaces = [];
let footballNs = new Namespace(0, "football", "/football");
let formula1Ns = new Namespace(1, "formula1", "/formula1");
let musicNs = new Namespace(2, "music", "/music");

namespaces.push(footballNs, formula1Ns, musicNs);

// Make the main room and add it to rooms. it will ALWAYS be 0
footballNs.addRoom(new Room(0, "New Articles", "football"));
footballNs.addRoom(new Room(1, "Editors", "football"));
footballNs.addRoom(new Room(2, "Other", "football"));

formula1Ns.addRoom(new Room(0, "Firefox", "formula1"));
formula1Ns.addRoom(new Room(1, "SeaMonkey", "formula1"));
formula1Ns.addRoom(new Room(2, "SpiderMonkey", "formula1"));
formula1Ns.addRoom(new Room(3, "Rust", "formula1"));

musicNs.addRoom(new Room(0, "Debian", "music"));
musicNs.addRoom(new Room(1, "Red Hat", "music"));
musicNs.addRoom(new Room(2, "MacOs", "music"));
musicNs.addRoom(new Room(3, "Kernal Development", "music"));

module.exports = namespaces;
