import { turso } from "./lib/turso";
import { Coffee } from "./models/Coffee";

async function getData() {
  try {
    const { rows } = await turso.execute("SELECT * FROM coffees");
    console.log(rows);
    return {
      coffees: rows as unknown as Coffee[],
    };
  } catch (error) {
    console.error(error);
    return {
      coffees: [],
    };
  }
}

export default async function Home() {
  const coffees = await getData();
  console.log(coffees);
  return (
    <main className="flex min-h-screen flex-col items-center  p-8 bg-amber-50 text-stone-800">
      <h1 className="text-4xl font-serif font-bold mb-8 text-stone-900">
        Cozy Coffee Spots
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {coffees.coffees.map((coffee) => (
          <li
            key={coffee.id}
            className="bg-amber-100 rounded-lg shadow-md p-6 hover:bg-amber-200 transition-colors duration-300 border border-amber-200"
          >
            <h2 className="text-2xl font-serif font-semibold mb-2 text-stone-900">
              {coffee.shop_name}
            </h2>
            <p className="mb-1 text-stone-700">
              <span className="font-medium">Coffee Rating:</span>{" "}
              {coffee.coffee_rating} ☕
            </p>
            <p className="mb-1 text-stone-700">
              <span className="font-medium">Dessert Rating:</span>{" "}
              {coffee.dessert_rating} 🍰
            </p>
            <p className="text-stone-600">
              <span className="font-medium">Location:</span> {coffee.location}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
