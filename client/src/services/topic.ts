import { redis } from "@/lib/redis";
import { notFound } from "next/navigation";

export const getTopic = async (topic: string) => {
  if (!topic) {
    return [];
  }

  if (!(await redis.sismember("topics", topic))) {
    return notFound();
  }

  const initalData = await redis.zrange<Array<string | number>>(
    `room:${topic}`,
    0,
    49,
    {
      withScores: true,
    }
  );

  const words: Array<{ text: string; value: number }> = [];

  for (let i = 0; i < initalData.length; i++) {
    const [text, value] = initalData.slice(i, i + 2);
    if (typeof text === "string" && typeof value === "number") {
      words.push({ text, value });
    }
  }

  await redis.incr(`served-counts`);

  return words;
};
