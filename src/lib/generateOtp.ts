/**
 * Generates a random 8 digit OTP
 * @returns {number} - 8 digit OTP
 * @example generateOTP() => 12345678
*/

function generateOTP():number {
  return Math.floor(10000000 + Math.random() * 90000000);
}

export default generateOTP;