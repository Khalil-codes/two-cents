import { assertValue } from "../utils";

export const getConfig = () => {
  const url = assertValue(
    process.env.UPSTASH_REDIS_REST_URL,
    "Missing environment variable: UPSTASH_REDIS_REST_URL"
  );

  const token = assertValue(
    process.env.UPSTASH_REDIS_REST_TOKEN,
    "Missing environment variable: UPSTASH_REDIS_REST_TOKEN"
  );
  return {
    url,
    token,
  };
};
