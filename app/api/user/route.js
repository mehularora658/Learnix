// app/api/user/route.js
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; // Make sure you import eq!

export async function POST(req) {
    const { email, name } = await req.json();

    const users = await db.select().from(usersTable)
        .where(eq(usersTable.email, email));

    if (users.length === 0) {
        const result = await db.insert(usersTable).values({
            name,
            email
        }).returning();

        return NextResponse.json(result);
    }

    return NextResponse.json(users);
}
