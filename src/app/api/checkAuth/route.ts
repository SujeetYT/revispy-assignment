import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';

export function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("AuthToken");
    
    if (!token) {
      return NextResponse.json({ authenticated: false, message: 'No token found' }, { status: 401 });
    }

    const verified = verifyToken(token.value);
    
    if(!verified) {
      console.log("Token verification failed, returning 401");
      return NextResponse.json({ error: "Unauthorized or token expired" }, { status: 401 });
    }

    
    return NextResponse.json({ authenticated: true, message: "Authenticated!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false, message: 'Unauthorized' }, { status: 401 });
  }
}
