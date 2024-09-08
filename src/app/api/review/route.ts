"use server";

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

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Missing id parameter" },
      { status: 400 }
    );
  }

  try {
    await tursoClient.execute({
      sql: "DELETE FROM coffees WHERE id = ?",
      args: [id],
    });

    return NextResponse.json(
      { message: "Coffee entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting coffee entry:", error);
    return NextResponse.json(
      { message: "Error deleting coffee entry" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const { id, shop_name, coffee_rating, dessert_rating, location } =
    Object.fromEntries(formData);

  if (!id) {
    return NextResponse.json(
      { message: "Missing id parameter" },
      { status: 400 }
    );
  }

  const fieldsToUpdate = [];
  const args = [];

  if (shop_name) {
    fieldsToUpdate.push("shop_name = ?");
    args.push(shop_name.toString());
  }
  if (coffee_rating) {
    fieldsToUpdate.push("coffee_rating = ?");
    args.push(parseInt(coffee_rating.toString()));
  }
  if (dessert_rating) {
    fieldsToUpdate.push("dessert_rating = ?");
    args.push(parseInt(dessert_rating.toString()));
  }
  if (location) {
    fieldsToUpdate.push("location = ?");
    args.push(location.toString());
  }

  if (fieldsToUpdate.length === 0) {
    return NextResponse.json(
      { message: "No fields to update" },
      { status: 400 }
    );
  }

  args.push(id.toString());

  try {
    await tursoClient.execute({
      sql: `UPDATE coffees SET ${fieldsToUpdate.join(", ")} WHERE id = ?`,
      args,
    });

    return NextResponse.json(
      { message: "Coffee entry updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating coffee entry:", error);
    return NextResponse.json(
      { message: "Error updating coffee entry" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const result = await tursoClient.execute(
      "SELECT * FROM coffees ORDER BY id DESC"
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching coffee entries:", error);
    return NextResponse.json(
      { message: "Error fetching coffee entries" },
      { status: 500 }
    );
  }
}
