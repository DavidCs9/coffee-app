import { turso } from "./lib/turso";
import { Couple } from "./models/Couple";

async function getData() {
  try {
    const { rows } = await turso.execute("SELECT * FROM couples");
    console.log(rows);
    return {
      couples: rows as unknown as Couple[],
    };
  } catch (error) {
    console.error(error);
    return {
      couples: [],
    };
  }
}

export default async function Home() {
  const couples = await getData();
  console.log(couples);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Couples</h1>
      <ul>
        {couples.couples.map((couple) => (
          <li
            key={couple.id}
            className="flex items-center justify-between w-full p-4 my-2 bg-gray-800 rounded-lg"
          >
            <p>{couple.id}</p>
            <p>{couple.user1_id}</p>
            <p>{couple.user2_id}</p>
            <p>{couple.created_at}</p>
            <p>{couple.updated_at}</p>
            <p>{couple.status}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
