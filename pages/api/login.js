import { createNewUser, isNewUser } from "../../lib/db/hasura";
import { magicAdmin } from "../../lib/db/magic";
import Jwt from "jsonwebtoken";
import { setTokenCookie } from "../../lib/cookie";
export default async function login(req, res) {
  if (req.method === "POST") {
    const auth = req.headers.authorization;
    const token = auth ? auth.substr(7) : "";

    const metaData = await magicAdmin.users.getMetadataByToken(token);
    try {
      const jwtToken = Jwt.sign(
        {
          ...metaData,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metaData.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );

      const isANewUser = await isNewUser(jwtToken, metaData.issuer);


      if (isANewUser) {
         await createNewUser(jwtToken, metaData);
         setTokenCookie(jwtToken,res);
        res.send({ done: true});
        return;
      }

      if (!isANewUser) {
         setTokenCookie(jwtToken,res);
        res.send({ done: true });
        return;
      }

      res.send({
        done: true,
        isANewUser,
      });
    } catch (err) {
      console.log("Something went wrong", err.message);
      res.send({
        done: false,
      });
    }
  } else {
    res.send({
      done: false,
    });
  }
}
