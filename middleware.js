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
  let host = req.headers.get("host");
  console.log(`host is: ${host}`);

  return NextResponse.next();
}
