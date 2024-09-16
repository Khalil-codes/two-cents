import TopicCreator from "@/components/topic-creator";
import { redis } from "@/lib/redis";
import { Star } from "lucide-react";

export default async function Home() {
  const requestsCount = await redis.get<string>("served-counts");

  return (
    <section className="relative flex flex-1 flex-col gap-16 pb-24 pt-10 md:pb-32 md:pt-24">
      <div className="absolute inset-0 top-8 hidden lg:block">
        {/* circle */}
      </div>
      <div className="px-6">
        <div className="relative mx-auto flex flex-col items-center text-center">
          <h1 className="w-fit text-balance text-5xl font-bold leading-snug tracking-tight text-gray-900 dark:text-gray-100">
            Share Your Two Cents. Spark the Conversation.
          </h1>
        </div>
      </div>
      <TopicCreator />
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1">
          <Star className="h-5 w-5 fill-green-500 text-green-500" />
          <Star className="h-5 w-5 fill-green-500 text-green-500" />
          <Star className="h-5 w-5 fill-green-500 text-green-500" />
          <Star className="h-5 w-5 fill-green-500 text-green-500" />
          <Star className="h-5 w-5 fill-green-500 text-green-500" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Served <b>{Math.ceil(Number(requestsCount) / 10) * 10}</b> requests
        </p>
      </div>
    </section>
  );
}
