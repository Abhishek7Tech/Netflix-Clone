import  Jwt  from "jsonwebtoken";
import { magicAdmin} from "../../lib/db/magic";
import { setTokenCookie } from "../../lib/cookie";
import { verifyToken } from "../../lib/utils";
export default async function logout(req, res) {
    
    const auth = req.headers.cookie;
    const token = auth ? auth.substr(6) : "";
    
    if (token === null) {
        res.writeHead(302, { Location: "/login" });
        res.end();
    }
    try{
        const isAValidToken = await verifyToken(token);
        setTokenCookie("",res);
        await magicAdmin.users.logoutByIssuer(token);
        if(isAValidToken){
            res.send({msg:"Logged Out SuccessFully"});
        }
    }catch(err) {
        res.send({done:"false"});
    }

}