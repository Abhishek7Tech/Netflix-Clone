import Jwt from "jsonwebtoken";

export const verifyToken = async (token) => {
    if(token){
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    return null;
} 

export const redirectUser = async (context) => {
    const token = context.req ? context.req?.cookies.token: null;
    const issuer = await verifyToken(token);
    const userId = issuer.issuer;
  
  
  return {
      token,
        userId
  }  

}