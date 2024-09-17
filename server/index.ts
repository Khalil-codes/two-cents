import express from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { Redis } from "ioredis";

const PORT = process.env.PORT || 8080;
const CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING;

if (!CONNECTION_STRING) {
  throw Error("Redis connection string is required");
}

const app = express();
app.use(cors());

const redis = new Redis(CONNECTION_STRING);
const subRedis = new Redis(CONNECTION_STRING);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://two-cents-2566.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

subRedis.on("message", (channel, message) => {
  console.log("Message Received", channel, message);
  io.to(channel).emit("room-update", message);
});

subRedis.on("error", (error) => {
  console.error("Redis Subscription Error", error);
});

io.on("connection", async (socket) => {
  const { id } = socket;
  console.log("User Connected", id);
  socket.on("join-room", async (room: string) => {
    console.log(`User ${id} joined ${room}`);
    const rooms = await redis.smembers("subscribed-rooms");
    await socket.join(room);
    await redis.sadd(`rooms:${id}`, room);
    await redis.hincrby("room-connections", room, 1);

    if (!rooms.includes(room)) {
      subRedis.subscribe(room, async (err) => {
        if (err) {
          console.error("Failed to Subscribe", err);
          return;
        }
        await redis.sadd("subscribed-rooms", room);
        console.log(
          `User ${id} subscribed to ${room} at ${new Date().toISOString()}`
        );
      });
    }
  });
  socket.on("disconnect", async () => {
    const { id } = socket;
    console.log("User Disconnected", id);
    const joinedRooms = await redis.smembers(`rooms:${id}`);
    await redis.del(`rooms:${id}`);

    joinedRooms.forEach(async (room) => {
      const leftConnections = await redis.hincrby("room-connections", room, -1);
      if (leftConnections <= 0) {
        await redis.hdel("room-connections", room);
        subRedis.unsubscribe(room, async (err) => {
          if (err) {
            console.error("Failed to Unsubscribe", err);
            return;
          }
          await redis.srem("subscribed-rooms", room);
          await redis.srem("topics", room.split(":")[1]);
          await redis.del(room);
          console.log(
            `User ${id} unsubcribed from ${room} at ${new Date().toISOString()}`
          );
        });
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
