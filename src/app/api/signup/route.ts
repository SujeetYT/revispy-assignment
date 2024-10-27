import { NextResponse } from "next/server";
import { db } from "@/DB/db.config";
import generateOTP from "@/lib/generateOtp";
import sendEmailOtp from "@/lib/sendEmailOtp";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // checking if user already exists
    const findUser = await db.users.findUnique({
      where: { email },
    });

    if (findUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // creating new user
    const user = await db.users.create({
      data: {
        name,
        email,
        password,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not created try again!" }, { status: 500 });
    }

    // generate otp
    const otp = generateOTP().toString();
    console.log(":: otp ::", otp);

    // save otp in db to verify later
    const createdOtp = await db.otp.create({
      data: {
        otp,
        email,
        userId: user.id, 
      }
    });

    console.log(":: createdOtp ::", createdOtp);

    // send otp to user email
    await sendEmailOtp({ to: user.email, otp: otp });


    return NextResponse.json({ message: "User created successfully. Check mail to verify otp." }, { status: 201 });

  } catch (error) {
    console.log(":: signup error ::", error);
  }
}