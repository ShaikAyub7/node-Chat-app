require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const os = require("os");
const path = require("path");

const socketFunction = require("./socket/socket");
const server = createServer(app);
const io = new Server(server);

// Middleware to parse JSON
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const hostname = os.hostname();
socketFunction(io);

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};
// start();
