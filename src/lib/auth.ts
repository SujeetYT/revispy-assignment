import jwt from "jsonwebtoken";

/**
 * Verify a JWT token
 * @param token JWT token to verify
 * @returns Decoded token or null if verification fails
 * @example
 * const token = "your_jwt_token_here";
 * const verified = verifyToken(token);
 * if(verified) {
 *  console.log("Token verified", verified);
 * } else {
 * console.log("Token verification failed");
 * }
*/
export function verifyToken(token: string) {
  try {
    const key = process.env.JWT_SECRET_KEY;
    if (!key) {
      throw new Error("JWT secret not configured");
    }
    
    const decoded = jwt.verify(token, key);
    console.log("Token verified successfully", decoded);
    return decoded;
  } catch (error) {
    console.log("Token verification failed", error);
    return null;
  }
}
