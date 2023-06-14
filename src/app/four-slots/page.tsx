"use client";

import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("./Base"), {
  ssr: false,
});

export default function Home() {
  return <NoSSRComponent />;
}
