import express from "express";
import { createServer } from "http";
import * as socketIO from "socket.io";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import contentSecurityPolicy from "helmet-csp";

import serveStatic from "serve-static";
import cors from "cors";
import path from "path";

// local imports
import apiRouter from "./api";
import socketHandler from "./sockets";

const api = express();
const space = socketHandler.space;

api.use(
  bodyParser.json({
    limit: process.env.JSON_SIZE_LIMIT || "5mb"
  })
);
api.use(helmet());
api.use(
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "default.example"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    },
    reportOnly: false
  })
);

api.use(cors());
api.use(express.json());

api.get("/api", (req, res) => {
  res.status(200).json({ status: "ok", pi: "𝜋" });
});

// MORE ROUTES HERE!

api.use("/api/example", apiRouter.example);

api.use(serveStatic(path.join(__dirname, "public")));

// websocket event server
const socketApp = createServer(api);
const io = new socketIO.Server(socketApp, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.send("welcome");

  // events
  socket.on("start", (extra: any | undefined) => {
    socketHandler.handleStart(io, socket, space, extra);
  });

  socket.on("join", (room: string | undefined) => {
    const bar = room ? room : "#general";
    socketHandler.handleJoin(io, socket, space, bar);
  });
  socket.on("leave", () => {
    socketHandler.handleLeave(io, socket, space);
  });
  socket.on("say", async (message: string, room: string) => {
    if (await socketHandler.screenMessage(io, socket, space, room, message)) {
      socketHandler.handleMessageRoom(io, socket, space, room, message);
    }
    // console.log(space);
  });

  socket.on("disconnecting", () => {
    socketHandler.handleDisconnect(io, socket, space);
  });

  // MORE EVENTS HERE!
});

export default socketApp;
