import axios from "axios";

const space: any = {
  rooms: ["#general"],
  stars: {},
  "#general": { id: "#general", buffer: [], welcome: "welcome to #general" },
  listeners: [
    {
      room: "*",
      startswith: "/join",
      lambda: (io: any, socket: any, msg: string) =>
        io.to(socket.id).emit("!emit", "join", msg.slice(6))
    },
    {
      room: "*",
      startswith: "/list",
      lambda: (io: any, socket: any, msg: string) =>
        io.to(socket.id).emit("rooms", listRooms())
    },
    {
      room: "*",
      startswith: "/norris",
      lambda: (io: any, socket: any, msg: string) => {
        axios
          .get("http://api.icndb.com/jokes/random?limitTo=[nerdy]")
          .then((result: any) => {
            messageRoom(io, socket, result.data.value.joke, "😂");
          });
      }
    },
    {
      room: "*",
      startswith: "/welcome",
      lambda: (io: any, socket: any, msg: string) => {
        messageRoom(io, socket, getWelcomeMessage(socket), "👋");
      }
    },
    {
      room: "*",
      startswith: "/topic",
      lambda: (io: any, socket: any, msg: string) => {
        console.log(`${currentUsername(socket)} set the topic of ${currentRoom(socket)} to ${msg.slice(6)}`);
        messageRoom(io, socket, setWelcomeMessage(socket, msg.slice(6)), "👋");
      }
    },
    {
      room: "*",
      startswith: "/username",
      lambda: (io: any, socket: any, msg: string) => {
        const oldUsername = currentUsername(socket);
        changeName(socket, msg.slice(10))
        console.log(`${oldUsername} changed their name to ${currentUsername(socket)}`);
        io.to(socket.id).emit("/username", msg.slice(10));
      }
    }
  ]
};
function changeName(socket:any, username:string) {
  if (!username) {
    return;
  }
  space[space.stars[socket.id]] = {
    ...space[space.stars[socket.id]],
    username
  }
}

export function currentRoom(socket: any) {
  return space[space.stars[socket.id]].current_room;
}

function currentUsername(socket: any) {
  return space[space.stars[socket.id]].username;
}

function getWelcomeMessage(socket: any) {
  const room = currentRoom(socket);
  if (!space[currentRoom(socket)].welcome) {
    space[currentRoom(socket)]["welcome"] = `welcome to ${room}`;
  }
  return space[currentRoom(socket)].welcome;
}

function setWelcomeMessage(socket: any, msg: string | undefined) {
  const room = currentRoom(socket);
  if (!space[currentRoom(socket)].welcome) {
    space[currentRoom(socket)]["welcome"] = `welcome to ${room}`;
  }
  if (msg) {
    space[currentRoom(socket)] = {
      ...space[currentRoom(socket)],
      welcome: msg
    };
  }
  return space[currentRoom(socket)].welcome;
}

function messageRoom(io: any, socket: any, message: string, sender: string) {
  const max = process.env.MAX_LINES ? Number(process.env.MAX_LINES) : 60;
  const room = currentRoom(socket);
  space[room].buffer.push(`${sender},${message}`);
  space[room].buffer = space[room].buffer.slice(
    space[room].buffer.length - max
  );
  io.to(room).emit("update room", space[room]);
}

function listRooms() {
  return space.rooms.map(
    (room: string) => `(${space[room].connected.length}) ${room}`
  );
}

function matchWords(subject: string, words: any[]) {
  const regexMetachars = /[(){[*+?.\\^$|]/g;
  const escapeMetaStrings = words.map((w: string) =>
    w.replace(regexMetachars, "\\$&")
  );
  const regex = new RegExp(
    "\\b(?:" + escapeMetaStrings.join("|") + ")\\b",
    "gi"
  );
  return subject.match(regex) || [];
}

export default space;
