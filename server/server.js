import { insertItem, db } from "./db.js";

// const server =
Bun.serve({
   port: 3030,
   // hostname: "bun.com",
   routes: {
      "/": (req) => {
         const url = new URL(req.url);
         return new Response(Bun.file("public/index.html"));
      },
      "/msgs/add": {
         POST: async (req) => {
            const { text } = await req.json();

            if (typeof text === "string" && text.trim()) {
               insertItem.run(text.trim());
            }
            return new Response("ok");
         },
      },
      "/msgs/load": {
         GET: () => {
            const posts = db.query("SELECT text FROM items").all();
            return Response.json(posts);
         },
      },
      "/*": (req) => {
         const url = new URL(req.url);
         const path = url.pathname;
         if (path === "/favicon.ico" || path.startsWith("/.well-known"))
            return false;
         console.log("this is caught", req.url);
         const file = Bun.file(`public${path}`);
         return new Response(file);
      },
   },
   error(er) {
      console.error("this is the error", er);
   },
   // fetch(req) {
   //    console.log("we are in the default fetch!");
   //    const url = new URL(req.url);
   //    console.log(url);
   //    let path = url.pathname;
   //    if (path === "/") {
   //       path = "/index.html";
   //       const file = Bun.file(`public${path}`);
   //       return new Response(file);
   //    }
   // },
});
// async fetch(req) {
//    const url = new URL(req.url);
//
//    // API route
//    if (req.method === "POST" && url.pathname === "/api/add") {
//       const { text } = await req.json();
//       if (typeof text === "string" && text.trim()) {
//          insertItem.run(text.trim());
//       }
//       return new Response("ok");
//    }
//
//    // Static files
//    let path = url.pathname;
//    if (path === "/") {
//       path = "/index.html";
//       console.log("we in here");
//    }
//
//    const file = Bun.file(`public${path}`);
//    console.log("this is the path: ", file);
//    if (file.size > 0) {
//       return new Response(file);
//    }
//
//    // console.log("this: ", await file.text());
//    return new Response("Not Found nugga", { status: 404 });
// },

// console.log(`Server running at http://localhost:${server.port}`);
