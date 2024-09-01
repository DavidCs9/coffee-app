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
    <main className="flex  flex-col items-center  p-8 bg-purple-900 text-purple-100">
      <h1 className="text-4xl font-bold mb-8 text-purple-200">
        Cozy Coffee Spots
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {coffees.coffees.map((coffee) => (
          <li
            key={coffee.id}
            className="bg-purple-800 rounded-lg shadow-lg p-6 hover:bg-purple-700 transition-colors duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-purple-100">
              {coffee.shop_name}
            </h2>
            <p className="mb-1">
              <span className="font-medium">Coffee Rating:</span>{" "}
              {coffee.coffee_rating} ☕
            </p>
            <p className="mb-1">
              <span className="font-medium">Dessert Rating:</span>{" "}
              {coffee.dessert_rating} 🍰
            </p>
            <p className="text-purple-300">
              <span className="font-medium">Location:</span> {coffee.location}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
