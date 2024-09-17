"use server";

import { redis } from "@/lib/redis";
import { slugify, wordFreq } from "@/lib/utils";
import { redirect } from "next/navigation";

export const createTopic = async (topic: string) => {
  if (!topic || topic.length > 50) {
    throw new Error("Topic must be between 1 and 50 characters");
  }

  const regex = /^[a-zA-Z0-9-\s\.]+$/;

  if (!regex.test(topic)) {
    throw new Error("Invalid topic");
  }

  const _topic = slugify(topic);

  if (!(await redis.sismember("topics", _topic))) {
    await redis.sadd("topics", _topic);
  }

  redirect("/" + _topic);
};
