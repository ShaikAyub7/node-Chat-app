const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
var audio = new Audio("noti.mp3");
const append = (message, position) => {
  const createElement = document.createElement("li");
  createElement.innerText = message;
  // createElement.classList.add("messages", position);
  createElement.classList.add("sent", position);
  createElement.classList.add("received", position);
  if (position === "left") {
    audio.play();
  }
  messages.append(createElement);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value.trim();
  append(`you : ${message}`, "right", "sent");
  socket.emit("send", message);
  input.value = "";
});

const username = prompt("Enter your username:");
socket.emit("new-user-joined", username);
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "left");
});
socket.on("recieve", (data) => {
  append(`${data.name}:  ${data.message}`, "left", "recieved");
});
socket.on("left", (name) => {
  append(`${name} left the chat`, "left", "recieved");
});
