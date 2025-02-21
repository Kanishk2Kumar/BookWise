"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq, ne } from "drizzle-orm";

// Fetch all users except ADMIN
export const fetchUsers = async () => {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        universityId: users.universityId,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(ne(users.role, "ADMIN"));

    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Delete a user by ID
export const deleteUser = async (id: string) => {
  try {
    await db.delete(users).where(eq(users.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
};
