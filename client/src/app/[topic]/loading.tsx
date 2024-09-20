import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
      <Loader size={60} className="animate-spin" />
      <p>Hang tight, we&apos;re getting things ready for you!</p>
      <p>
        P.S. Our auto-scaling keeps things efficient, so servers may power down
        when idle.
      </p>
    </div>
  );
};

export default Loading;
