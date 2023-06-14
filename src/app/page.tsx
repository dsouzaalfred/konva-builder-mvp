import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl font-bold text-center pb-4">Konva builder</h1>
      <Link className="underline" href="/square">
        Square
      </Link>
      <Link className="underline" href="/landscape">
        Landscape
      </Link>
      <Link className="underline" href="/portrait">
        Portrait
      </Link>
      <Link className="underline" href="/four-slots">
        Four slots
      </Link>
    </main>
  );
}
