const input = document.getElementById("text");
const button = document.getElementById("add");
const out = document.getElementById("out");
const sendButton = document.getElementById("send");

const recipId = "them";
const user = {
   userId: "me",
};

button.addEventListener("click", async () => {
   const value = input.value.trim();
   if (!value) return;

   await fetch("/msgs/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
   });

   input.value = "";
});

sendButton.addEventListener("click", async () => {
   const value = input.value.trim();
   if (!value) return;

   await fetch("/msgs/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         text: value,
         sender: user.userId,
         recip: recipId,
      }),
   });

   input.value = "";
});

window.onload = async function () {
   const alfa = await fetch("/msgs/load");

   // out.innerHTML = JSON.parse(alfa);
   const jk = await alfa.json();
   let msgStr = "";
   for (const i of jk) {
      msgStr += i.text + "\n";
   }
   out.innerHTML = msgStr;
};
