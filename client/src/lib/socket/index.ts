import { io } from "socket.io-client";
import { assertValue } from "../utils";

// "undefined" means the URL will be computed from the `window.location` object
const URL = assertValue(
  process.env.NEXT_PUBLIC_SERVER_URL,
  "NEXT_PUBLIC_SERVER_URL is not defined"
);

export const socket = io(URL, { autoConnect: false });
