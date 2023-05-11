// import { NextResponse } from "next/server";
// import { verifyToken } from "./lib/utils";

// export async function middleware (req, ev) {
// const token = req ? req.cookies?.token : null;
// const userId = await verifyToken(token);

// const {pathname} = req.nextUrl;

// if((token && userId) || pathname.includes("/api/login")){
//    return NextResponse.next();
// }

// if(!token && pathname !== "/login"){
//     return NextResponse.redirect("/login");
// }
// }

import { NextResponse } from "next/server";
import { verifyToken } from "./lib/utils";

export async function middleware(req, ev) {
  const token = req ? req.cookies.get("token") : null;
  const userId = await verifyToken(token);
  const { pathname } = req.nextUrl;
  console.log("PATHNAME", pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/login") ||
    userId ||
    pathname.includes("/static")
  ) {
    return NextResponse.next();
  }

  if ((!token || !userId) && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
}
