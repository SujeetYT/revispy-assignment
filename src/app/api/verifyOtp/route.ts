import { db } from "@/DB/db.config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    // checking if otp exists
    const findOtp = await db.otp.findFirst({
      where: { email },
    });

    if (!findOtp) {
      return NextResponse.json({ error: "OTP not found!" }, { status: 400 });
    }

    // checking if otp is valid
    if(findOtp.otp !== otp){
      return NextResponse.json({ error: "Invalid OTP!" }, { status: 400 });
    }
    
    // update user as verified
    if (!findOtp.userId) {
      return NextResponse.json({ error: "User not found for otp" }, { status: 400 });
    }

    const user = await db.users.update({
      where: { id: findOtp.userId },
      data: {
        isVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not verified try again!" }, { status: 500 });
    }

    // delete otp
    await db.otp.delete({
      where: { id: findOtp.id },
    });

    return NextResponse.json({ message: "User verified successfully" }, { status: 200 });

  } catch (error) {
    console.log(":: verifyOtp error ::", error);
  }
}