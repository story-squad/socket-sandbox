import {currentRoom} from "./space";

async function handleDisconnect(io: any, socket: any, space: any) {
  const surfaceID = currentRoom(socket);
  if (space[surfaceID]) {
    console.log(`${socket.id} disconnected from ${surfaceID}`);
    space[surfaceID] = {
      ...space[surfaceID],
      connected: [
        ...space[surfaceID].connected.filter((u: any) => u.id !== socket.id)
      ]
    };
  }
  delete space[space.stars[socket.id]]; // userspace
  delete space.stars[socket.id]; // userpace-key
  io.to(surfaceID).emit("update room", space[surfaceID]);
  io.local.emit("!emit", "say", "/list");
}

export default handleDisconnect;
