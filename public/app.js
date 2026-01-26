// const input = document.getElementById("msgText");
// const out = document.getElementById("content");
// const sendButton = document.getElementById("send");
// const auth = document.getElementById("auth");
function loadGlobals() {
   const g = {
      input: document.getElementById("msgText"),
      out: document.getElementById("content"),
      sendButton: document.getElementById("send"),
      auth: document.getElementById("auth"),
   };

   for (const a in g) {
      console.log(a, g[a]);
      window[a] = g[a];
   }
}
// if ("serviceWorker" in navigator) {
//    window.addEventListener("load", () => {
//       navigator.serviceWorker
//          .register("../sw.js")
//          .then((registration) => {
//             console.log("Service worker registered:", registration.scope);
//          })
//          .catch((error) => {
//             console.error("Service worker registration failed:", error);
//          });
//    });
// }

window.addEventListener("load", async () => {
   if ("serviceWorker" in navigator) {
      navigator.serviceWorker
         .register("../sw.js")
         .then((registration) => {
            console.log("Service worker registered:", registration.scope);
         })
         .catch((error) => {
            console.error("Service worker registration failed:", error);
         });
   }
   const app = await fetch("/app/load", {
      method: "GET",
      headers: { "Content-Type": "text/html; charset=utf-8" },
   });
   console.log("do some thing here");
   swap("app", await app.text());
   activateMessages();
   usbtn();
});

const recipId = "them";
const user = {
   userId: "me",
};

// const user = null;
async function activateMessages() {
   const msgBtn = await document.getElementById("msgBtn");
   msgBtn.addEventListener("click", async () => {
      const blah = await fetch("/app/swap", {
         method: "GET",
         headers: { "Content-Type": "text/html; charset=utf-8" },
      });
      // out.outerHTML = await blah.text();
      // console.log(await blah.text());
      swap("content", await blah.text());
      // swap("msgHist", await msgsMU(
   });
}

function usbtn() {
   const userBtn = document.getElementById("auth");
   userBtn.addEventListener("click", async () => {
      console.log("not the problem");
      await fetch("/user/create", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            userId: "jimmy",
            email: "jimmy@email.com",
         }),
      });
   });
}

function swap(oel, nel, side = "inner") {
   const swapEl = document.getElementById(oel);
   if (side === "inner") {
      swapEl.innerHTML = nel;
   } else {
      console.log("the fuck");
      swapEl.outerHTML = nel;
   }
}

//
// sendButton.addEventListener("click", async () => {
//    const value = input.value.trim();
//    if (!value) return;
//
//    await fetch("/msgs/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//          text: value,
//          sender: user.userId,
//          recip: recipId,
//       }),
//    });
//
//    input.value = "";
// });
