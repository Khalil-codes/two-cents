import { getTopic } from "@/services/topic";
import React from "react";
import ClientPage from "./client";

type Props = {
  params: {
    topic: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { topic } = params;
  return { title: `${topic} | Two Cents` };
}

const TopicPage = async ({ params }: Props) => {
  const { topic } = params;

  const words = await getTopic(topic);

  await fetch(process.env.NEXT_PUBLIC_SERVER_URL!);

  return <ClientPage topic={topic} initialData={words} />;
};

export default TopicPage;
