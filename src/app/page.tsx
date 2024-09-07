import { UploadReview } from "@/components/upload-review";
import { tursoClient } from "./lib/tursoClient";
import { Coffee } from "./models/Coffee";
import { CafeCard } from "@/components/cafe-card";

export const revalidate = 86400; // Set ISR directly in the component

async function getData(): Promise<Coffee[]> {
  try {
    const { rows } = await tursoClient.execute(
      "SELECT * FROM coffees ORDER BY id DESC"
    );
    const coffees = rows as unknown as Coffee[];
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    for (const coffee of coffees) {
      coffee.created_at = new Date(coffee.created_at).toLocaleDateString(
        "es-ES",
        options
      );
    }
    return coffees;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const coffees = await getData();
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
