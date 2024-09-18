"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { createTopic } from "@/actions";
import { toast } from "sonner";

const TopicCreator = () => {
  const ref = React.useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createTopic,
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSettled: () => {
      if (ref.current) {
        ref.current.value = "";
      }
    },
  });

  const handleSubmit = () => {
    if (ref.current) {
      mutate(ref.current.value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          className="min-w-72 bg-gray-50 dark:bg-gray-950"
          placeholder="Enter your topic..."
          ref={ref}
          disabled={isPending}
          autoFocus
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button variant="default" disabled={isPending} onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default TopicCreator;
