import app from "./app";
import { AddressInfo } from "net";
import * as dotenv from "dotenv";

dotenv.config();
const IP = process.env.IP;
const PORT = Number(process.env.PORT);
const server = app.listen(PORT, IP, () => {
  const { port, address } = server.address() as AddressInfo;
  console.log(`\n\nlistening @ http://${address}${port ? `:${port}` : ""}`);
});
