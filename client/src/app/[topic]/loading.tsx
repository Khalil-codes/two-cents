import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader size={60} className="animate-spin" />
    </div>
  );
};

export default Loading;
