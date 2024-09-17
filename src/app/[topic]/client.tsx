"use client";

import React, { useState } from "react";
import { Wordcloud } from "@visx/wordcloud";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

type Props = {
  topic: string;
  initialData: Array<{ text: string; value: number }>;
};

const COLORS = ["#5c82ba", "#359cea", "#4863fa"];

const ClientPage = ({ initialData, topic }: Props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [words, setWords] = useState(initialData);

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [24, 72],
  });

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10">
      <div>
        <Link href={"/"} className="text-md flex items-center gap-2">
          <MoveLeft size={18} /> Go back
        </Link>
      </div>
      <h1 className="text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
        Share your two cents on <span className="text-blue-600">{topic}</span>
      </h1>

      <p className="text-sm text-gray-800 dark:text-gray-400">
        (updated in real time)
      </p>
      <div className="flex aspect-square max-w-xl flex-1 items-center justify-center">
        <Wordcloud
          words={words}
          height={600}
          width={500}
          font="Impact"
          padding={2}
          rotate={0}
          spiral="archimedean"
          random={() => 0.5}
          fontSize={(w) => fontScale(w.value)}>
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={COLORS[i % COLORS.length]}
                textAnchor={"middle"}
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                fontSize={w.size}
                fontFamily={w.font}>
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      </div>
      <div className="w-full max-w-xl">
        <Label>Here&apos;s what I think about this topic</Label>
        <div className="mt-2 flex items-center gap-2">
          <Input
            placeholder={topic}
            ref={ref}
            autoFocus
            className="bg-gray-50 dark:bg-gray-950"
          />
          <Button>Shoot</Button>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
