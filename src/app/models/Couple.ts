// models/Couple.ts

export interface Couple {
  id: string; // Assuming IDs are UUIDs or strings
  user1_id: string; // The ID of the first user
  user2_id: string; // The ID of the second user
  created_at: string; // Timestamp of when the record was created
  updated_at: string; // Timestamp of the last update
  status: "pending" | "confirmed"; // Status of the couple relationship
}
