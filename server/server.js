import { insertItem, db, createUser, createUserMsgs } from "./db.js";
import sharp from "sharp";

const recipId = "them";
const user = {
   userId: "me",
};

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
            const { text, sender, recip } = await req.json();

            if (typeof text === "string" && text.trim()) {
               insertItem.run(text.trim(), sender, recip);
            }
            return new Response("ok");
         },
      },
      "/msgs/load": {
         GET: () => {
            const posts = db.query("SELECT text FROM msgs").all();
            return Response.json(posts);
         },
      },
      "/user/create": {
         POST: async (req) => {
            const { userId, email } = await req.json();
            createUser.run(userId, "client", email);
            createUserMsgs(userId);
            return new Response("ok");
         },
      },
      "/app/swap": {
         GET: async (req) => {
            console.log("ahhdshshhh");
            const htmlFrag = `
               <div>what up bitches
               <div>what up bitches</div>
</div>`;
            return new Response(htmlFrag, {
               headers: {
                  "Content-Type": "text/html",
               },
            });
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
});

function nonUniqueInDb(erField) {
   return "error submitting to database";
}

const inImg = "./img.jpg";
const outPath = "./out.webp";

async function processImg() {
   try {
      await sharp(inImg).resize(320, 240).toFormat("webp").toFile(outPath);
      console.log("got the job done");
   } catch (er) {
      console.error(er);
   }
}

// processImg();
