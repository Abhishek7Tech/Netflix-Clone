import cookie from "cookie";

const MAX_AGE = 7 * 24 * 60 * 60;

export const setTokenCookie = (token, res) => {
const setCookie = cookie.serialize("token", token , {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    path: "/"
});
console.log("COOKIE", setCookie);
 return res.setHeader("Set-Cookie", setCookie);
}