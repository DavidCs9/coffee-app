import { NextResponse, NextRequest } from "next/server";
import { tursoClient } from "../../lib/tursoClient";

interface newCoffee {
  shop_name: string; // Name of the coffee shop
  coffee_rating: number; // Rating of the coffee, between 1 and 5
  dessert_rating: number; // Rating of the dessert, between 1 and 5
  picture_url: string; // URL of the picture (optional)
  location: string; // Location of the coffee shop (optional)
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const { shop_name, coffee_rating, dessert_rating, picture_url, location } =
    Object.fromEntries(formData);

  if (
    !shop_name ||
    !coffee_rating ||
    !dessert_rating ||
    !picture_url ||
    !location
  ) {
    const missingFields = [];
    if (!shop_name) {
      missingFields.push("shop_name");
    }
    if (!coffee_rating) {
      missingFields.push("coffee_rating");
    }
    if (!dessert_rating) {
      missingFields.push("dessert_rating");
    }
    if (!picture_url) {
      missingFields.push("picture_url");
    }
    if (!location) {
      missingFields.push("location");
    }
    return NextResponse.json(
      { message: `Missing fields: ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  const name = shop_name.toString();
  const coffeeRating = parseInt(coffee_rating.toString());
  const dessertRating = parseInt(dessert_rating.toString());
  const pictureUrl = picture_url.toString();
  const locationName = location.toString();

  const newCoffee: newCoffee = {
    shop_name: name,
    coffee_rating: coffeeRating,
    dessert_rating: dessertRating,
    picture_url: pictureUrl,
    location: locationName,
  };

  console.log(newCoffee.shop_name);

  await tursoClient.execute({
    sql: "INSERT INTO coffees (shop_name, coffee_rating, dessert_rating, picture_url, location) VALUES (?, ?, ?, ?, ?)",
    args: [
      newCoffee.shop_name,
      newCoffee.coffee_rating,
      newCoffee.dessert_rating,
      newCoffee.picture_url,
      newCoffee.location,
    ],
  });

  return NextResponse.json(
    { message: "Coffee entry added successfully" },
    { status: 200 }
  );
}
