require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const os = require("os");
const path = require("path");
const router = require("./routes/rout");
const authRoutes = require("./routes/authRoutes");
// const socketFunction = require("./socket/socket");
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);
app.use("/", authRoutes);
// socketFunction(io);

const port = process.env.PORT || 3000;
// server.listen(port, () =>
//   console.log(`Server is running on http://localhost:${port}`)
// );
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
start();
