"use client";

import React, { useMemo } from "react";
import { Wordcloud as VisxWordcloud } from "@visx/wordcloud";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import { useScreenSize } from "@visx/responsive";

type Props = {
  words: Array<{ text: string; value: number }>;
  colors?: string[];
};

const COLORS = ["#5c82ba", "#359cea", "#4863fa"];

const WordCloud = ({ words, colors = COLORS }: Props) => {
  const { height, width } = useScreenSize({
    debounceTime: 1000,
    initialSize: { width: 100, height: 420 },
  });

  const fontScale = useMemo(
    () =>
      scaleLog({
        domain: [
          Math.min(...words.map((w) => w.value)),
          Math.max(...words.map((w) => w.value)),
        ],
        range: [24, 72],
      }),
    [words]
  );

  return (
    <VisxWordcloud
      words={words}
      height={Math.min(height - 370, 700)}
      width={Math.min(width - 50, 500)}
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
            fill={colors[i % colors.length]}
            textAnchor={"middle"}
            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
            fontSize={w.size}
            fontFamily={w.font}>
            {w.text}
          </Text>
        ))
      }
    </VisxWordcloud>
  );
};

export default WordCloud;
