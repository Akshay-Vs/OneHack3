"use client";
import Window from "@/components/Typing/Window";
import { Suspense, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 300);

  return <div>{!isLoading && <Window />}</div>;
};

export default Page;
