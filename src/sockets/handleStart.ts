import { privateMessage, localAxios } from "./common";

async function handleStart(io: any, socket: any, space: any, username: string) {
  const payload = { created: Date.now(), username };
  const output = { listener: "welcome", message: undefined };
  try {
    const { data } = await localAxios.post("/api/example/start/", payload);
    const { surface } = data;
    space.stars[socket.id] = surface.id;
    space[surface.owner] = surface;
    output.message = data;
  } catch (err) {
    output.message = err.message;
  }
  privateMessage(io, socket, output.listener, output.message);
}

export default handleStart;
