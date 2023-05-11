import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export const verifyToken = async (token) => {
  try {
    if (token) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return verified.payload && verified.payload?.issuer;
    }
    return null;
  } catch (err) {
    console.err("JOSE", { err });
    return null;
  }
  return null;
};

export const redirectUser = async (context) => {
  const token = context.req ? context.req.cookies?.token : null;
  const userId = await verifyToken(token);
  return {
    userId,
    token,
  };
};
