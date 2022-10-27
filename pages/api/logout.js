import  Jwt  from "jsonwebtoken"; 
import { setTokenCookie } from "../../lib/cookie";

export default async function logout(req, res) {
    
    const auth = req.headers.cookie;
    const token = auth ? auth.substr(6) : "";

    try{
        const isAValidToken = Jwt.verify(token,process.env.JWT_SECRET);

        if(isAValidToken){
            setTokenCookie(null,res);
            res.send({msg:"Logged Out SuccessFully"});
        }
    }catch(err) {
        console.log("Token Not Authenticated", err.message);
        res.send({done:"false"});
    }

}