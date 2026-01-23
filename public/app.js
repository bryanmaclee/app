const input = document.getElementById("msgText");
const msgBtn = document.getElementById("msgBtn");
const out = document.getElementById("content");
const sendButton = document.getElementById("send");
const userBtn = document.getElementById("homeBtn");

const recipId = "them";
const user = {
   userId: "me",
};

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
//
// window.onload = async function () {
//    const alfa = await fetch("/msgs/load");
//
//    // out.innerHTML = JSON.parse(alfa);
//    const jk = await alfa.json();
//    let msgStr = "";
//    for (const i of jk) {
//       msgStr += i.text + "\n";
//    }
//    out.innerHTML = msgStr;
// };

function swap(oel, nel, side = "inner") {
   const swapEl = document.getElementById(oel);
   if (side === "inner") {
      swapEl.innerHTML = nel;
   } else {
      console.log("the fuck");
      swapEl.outerHTML = nel;
   }
}
