import { createClient } from "@libsql/client";

export const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
