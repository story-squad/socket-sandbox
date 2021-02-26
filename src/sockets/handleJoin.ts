export async function handleJoin(
  io: any,
  socket: any,
  space: any,
  surfaceID: string
) {
  if(surfaceID[0] !== '#') {
    console.log('bad channel name, redirecting to #general')
    io.to(socket.id).emit("!emit", "join", "#general");
    return;
  }
  const username = space[space.stars[socket.id]].username;
  console.log(`${username} joins ${surfaceID}`);
  if (!space[surfaceID]) {
    // create a room if it does not exist
    space[surfaceID] = { id: surfaceID, buffer: [] };
  }
  if (!space[surfaceID].connected) {
    // if room is empty, create a connection array
    space[surfaceID].connected = [];
  }
  socket.join(surfaceID);
  space[surfaceID] = {
    ...space[surfaceID],
    connected: [
      ...space[surfaceID].connected,
      { id: socket.id, name: username }
    ]
  };
  space[space.stars[socket.id]].current_room = surfaceID; // memoize current room
  if(space.rooms.filter((n:string) => n === surfaceID).length === 0){
    space.rooms.push(surfaceID);
  }
  io.to(surfaceID).emit("update room", space[surfaceID]);
  // make everyone refresh their channel list
  io.local.emit("!emit", "say", "/list");
}

export async function handleLeave(
  io: any,
  socket: any,
  space: any,
) {
  const surfaceID = space[space.stars[socket.id]].current_room;
  console.log(`${space[space.stars[socket.id]].username} leaves ${surfaceID}`);
  space[surfaceID] = {
    ...space[surfaceID],
    connected: space[surfaceID].connected.filter((u: any) => u.id !== socket.id)
  };
  socket.leave(surfaceID);
  io.to(surfaceID).emit("update room", space[surfaceID]);
}
