import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <p className="text-6xl font-bold text-blue-500">404</p>
      <h1 className="text-3xl font-bold">Topic not found</h1>
      <div>
        <Link href={"/"} className="text-md flex items-center gap-2">
          <MoveLeft size={18} /> Go back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
