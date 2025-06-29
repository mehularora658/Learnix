// app/api/user/route.js
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; // Make sure you import eq!

export async function POST(req) {
    let body;

    try {
        body = await req.json();
    } catch (err) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, name } = body;

    if (!email || !name) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const users = await db.select().from(usersTable)
        .where(eq(usersTable.email, email));

    if (users.length === 0) {
        const result = await db.insert(usersTable).values({ name, email }).returning();
        return NextResponse.json(result);
    }

    return NextResponse.json(users);
}
