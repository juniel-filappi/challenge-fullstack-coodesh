import jwt from "jsonwebtoken";

export function generateToken(userId: string, params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET!, {
    expiresIn: "1d",
    subject: userId,
  });
}
