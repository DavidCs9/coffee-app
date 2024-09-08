"use client";

import { UploadReview } from "@/components/upload-review";
import { Coffee } from "./models/Coffee";
import { CafeCard } from "@/components/cafe-card";
import { useEffect, useState } from "react";

async function getCoffees(): Promise<Coffee[]> {
  const response = await fetch("/api/review");
  return response.json();
}

export default function Home() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  useEffect(() => {
    getCoffees().then(setCoffees);
    console.log("coffees", coffees);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-amber-50 text-stone-800">
      <h1 className="text-4xl font-serif font-bold mb-8 text-stone-900">
        Coffee Spots ☕
      </h1>
      <UploadReview />
      <ul className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {coffees.map((coffee) => (
          <li key={coffee.id}>
            <CafeCard {...coffee} />
          </li>
        ))}
      </ul>
    </main>
  );
}
