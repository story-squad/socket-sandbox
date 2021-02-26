export async function handleMessageRoom(
  io: any,
  socket: any,
  space: any,
  room: string,
  message: any
) {
  const max = process.env.MAX_LINES ? Number(process.env.MAX_LINES) : 60;
  const username = space[space.stars[socket.id]].username;
  space[room].buffer.push(`${username},${message}`);
  space[room].buffer = space[room].buffer.slice(
    space[room].buffer.length - max
  );
  io.to(room).emit("update room", space[room]);
}

export async function screenMessage(
  io: any,
  socket: any,
  space: any,
  room: string,
  message: any
) {
  var verb = 0;
  const listeners = space.listeners.filter((l: any) => l.room === room || l.room === "*");
  const action = listeners.filter((l: any) => message.startsWith(l.startswith));
  // console.log(action);
  action.forEach((a: any) => {
    a.lambda(io, socket, message);
    verb += 1;
  });
  return verb === 0;
}
