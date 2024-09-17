import { getTopic } from "@/services/topic";
import React from "react";
import ClientPage from "./client";

type Props = {
  params: {
    topic: string;
  };
};

const TopicPage = async ({ params }: Props) => {
  const { topic } = params;

  const words = await getTopic(topic);

  return <ClientPage topic={topic} initialData={words} />;
};

export default TopicPage;
