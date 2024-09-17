import { Redis } from "@upstash/redis";
import { getConfig } from "./config";

export const redis = new Redis({
  url: getConfig().url,
  token: getConfig().token,
});
