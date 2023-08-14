import { NextResponse } from "next/server";

// const [BASIC_USER, BASIC_PASS] = (process.env.HTTP_BASIC_AUTH || ":").split(
//   ":"
// );

// Check if authenticated
// export function middleware(req) {
//   if (!isAuthenticated(req)) {
//     return new NextResponse("Authentication required", {
//       status: 401,
//       headers: { "WWW-Authenticate": "Basic" },
//     });
//   }

//   return NextResponse.next();
// }

// Check HTTP Basic Auth
// function isAuthenticated(req) {
//   const authheader =
//     req.headers.get("authorization") || req.headers.get("Authorization");

//   if (!authheader) {
//     return false;
//   }

//   const auth = Buffer.from(authheader.split(" ")[1], "base64")
//     .toString()
//     .split(":");
//   const user = auth[0];
//   const pass = auth[1];

//   if (user == BASIC_USER && pass == BASIC_PASS) {
//     return true;
//   } else {
//     return false;
//   }
// }

// do not define matcher if you want Basic Auth for all pages
// export const config = {
//   matcher: ["/"],
// };

// IP checklist

export function middleware(req) {
  let whiteListedIP = ["127.0.0.1"];
  let ip = req.ip ?? req.headers.get("x-real-ip");
  let forwardedFor = req.headers.get("x-forwarded-for");
  // console.log(`IP is: ${ip}`);
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "Unknown";
  }
  console.log(`IP is: ${ip}`);
  console.log(`forwarded for: ${forwardedFor}`);
  // const matchIP = whiteListedIP.find((e) => e == ip);
  // if (!matchIP) {
  //   return new NextResponse("Access Denied!", {
  //     status: 403,
  //   });
  // }
  return NextResponse.next();
}
