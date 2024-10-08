"use client";

import React, { useEffect, useRef, useState } from "react";
import WordCloud from "@/components/word-cloud";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { submitComment } from "@/actions";
import { toast } from "sonner";
import { socket } from "@/lib/socket";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

type Props = {
  topic: string;
  initialData: Array<{ text: string; value: number }>;
};

const ClientPage = ({ initialData, topic }: Props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const alreadyJoined = useRef<boolean>(false);
  const [words, setWords] = useState(initialData);

  useEffect(() => {
    if (!alreadyJoined.current) {
      socket.connect();
      socket.emit("join-room", `room:${topic}`);
      alreadyJoined.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("room-update", (message: string) => {
      const incomingWords = JSON.parse(message) as Array<{
        text: string;
        value: number;
      }>;
      incomingWords.map((word) => {
        const isAlreadyIncluded = words.some((w) => w.text === word.text);
        if (isAlreadyIncluded) {
          setWords((prev) =>
            prev.map((w) =>
              w.text === word.text
                ? { ...word, value: w.value + word.value }
                : w
            )
          );
        } else if (words.length < 50) {
          setWords((prev) => [...prev, word]);
        }
      });
    });
    return () => {
      socket.off("room-update");
    };
  }, [words]);

  const { mutate, isPending } = useMutation({
    mutationFn: submitComment,
    onSuccess: () => {
      if (ref.current) {
        ref.current.value = "";
      }
      toast.success("Comment submitted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = () => {
    if (ref.current) {
      mutate({ topic, comment: ref.current.value });
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-4">
      <div>
        <Link
          href={"/"}
          className="text-md flex items-center gap-2"
          onClick={() => {
            socket.disconnect();
            alreadyJoined.current = false;
          }}>
          <MoveLeft size={18} /> Go back
        </Link>
      </div>
      <h1 className="text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
        Share your two cents on <span className="text-blue-600">{topic}</span>
      </h1>

      <p className="text-sm text-gray-800 dark:text-gray-400">
        (updated in real time)
      </p>
      <div className="flex max-w-xl flex-1 items-center justify-center md:aspect-square">
        <WordCloud words={words} />
      </div>
      <div className="w-full max-w-xl">
        <Label>Here&apos;s what I think about this topic</Label>
        <div className="mt-2 flex items-center gap-2">
          <Input
            placeholder={topic}
            ref={ref}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            className="bg-gray-50 dark:bg-gray-950"
          />
          <Button onClick={handleSubmit} disabled={isPending}>
            Shoot
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
