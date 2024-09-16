"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TopicCreator = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          className="min-w-64"
          placeholder="Enter your topic..."
          value={input}
          onBlur={(e) => setInput(e.target.value)}
        />
        <Button variant="default">Create</Button>
      </div>
    </div>
  );
};

export default TopicCreator;
