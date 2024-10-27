import { NextResponse } from "next/server";
import { db } from "@/DB/db.config";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
  
    const user = await db.users.findUnique({
      where: {
        email
      },
    });
  
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
  
    // Authenticate the user, then generate a JWT token
    const key = process.env.JWT_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "JWT secret not configured" }, { status: 500 });
    }
  
    const token = jwt.sign({ userId: user.id }, key, { expiresIn: "1h" });
  
    const response = NextResponse.json({ message: "Login Successful" }, { status: 200 });
    response.cookies.set("AuthToken", token, { httpOnly: true, secure: true });
    return response;
  } catch (error) {
    console.log(error);
  }
}
