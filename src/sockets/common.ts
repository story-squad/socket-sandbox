import axios from "axios";

/**
 * use for internal calls to /api/endoints
 */
export const localAxios = axios.create({
  baseURL: `${process.env.BASE_URL || "http://127.0.0.1"}:${
    process.env.PORT || "8080"
  }`
});

/**
 * sends a message to socket.id
 *
 * @param io any (socketio)
 * @param socket any (socketio)
 * @param listener string (event being listend for)
 * @param content any
 */
export async function privateMessage(
  io: any,
  socket: any,
  listener: string,
  content: any
) {
  try {
    const pid = socket.id;
    io.to(pid).emit(listener, content); // private message player
  } catch (err) {
    console.log({ [listener]: content });
  }
}

/**
 * encode a string in Base64
 * @param str string
 */
const encode64 = (str: string): string =>
  Buffer.from(str, "binary").toString("base64");

/**
 * decode a string from Base64
 * @param str string
 */
const decode64 = (str: string): string =>
  Buffer.from(str, "base64").toString("binary");

/**
 * Base64 string operatoins
 */
export const b64 = { encode: encode64, decode: decode64 };
