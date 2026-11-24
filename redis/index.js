const express = require("express");
const redis = require("./redis/redisClient.js");

const app = express();

async function initRedis() {
  // set value
  await redis.set("username", "Raju kayal");
  await redis.set("password", "123456");
  await redis.set("phone", "6025365895");
  await redis.set("otp", "602536");
  await redis.set('email',"3sWlM@example.com");

  // get value
  const username = await redis.get("username");
  const password = await redis.get("password");
  const otp = await redis.get("otp");
  const email = await redis.get("email");
  console.log("Username from Redis:", username);
  console.log("Password from Redis:", password);
  console.log("OTP from Redis:", otp);
  console.log("Email from Redis:", email);

}
 //initRedis();

// app.get("/", async (req, res) => {
//   const username = await redis.get("username");
//   const password = await redis.get("password");
//   const phone = await redis.get("phone");
//   const otp = await redis.get("otp");
//   const email = await redis.get("email");
//   //res.send(`Hello ${username} and password ${password} and phone ${phone} and otp ${otp} and email ${email}`);

//   res.send(`hi ${username}`)
// })



//  redis.set("employee_name", "Raju kayal");
//  redis.set("employee_id", "12345");
//  redis.set("employee_email", "3sWlM@example.com");
//   redis.set("employee_phone", "6025365895");



// app.get("/employee", async (req, res) => {
//   const employee_name = await redis.get("employee_name");
//   const employee_id = await redis.get("employee_id");
//   const employee_email = await redis.get("employee_email");
//   const employee_phone = await redis.get("employee_phone");

//   res.send(`Hello my emoloyee NAme is:  ${employee_name} and id is: ${employee_id} and email is: ${employee_email} and phone is: ${employee_phone}`);
// });


// // //delete
// redis.set("username", "Raju kayal");
// console.log("Username set in Redis:", "Raju kayal");
// async function deleteRedis() {
//   await redis.del("username");
//   const exists = await redis.exists("username");
//   console.log("Username exists in Redis:", exists);
// }

// deleteRedis();

//  redis.set('myKey', 'lenovo', 'EX', 30);
//  const success = redis.expire('myKey', 30); 

// if (success === 1) {
//     console.log("Expiration successfully set.");
// } else {
//     console.log("Key does not exist or expiration couldn't be set."); // Returns 0
// }
// //EXPIRE / TTL (Auto-delete)
// async function expireRedis() {
//   await redis.set("otp", "602536");
//   const exists = await redis.expire("otp", 30);
//   //console.log("Username exists in Redis:", exists);
//   const ttl = await redis.ttl("otp");
//     console.log(ttl); // seconds remaining
// }

// expireRedis();

// app.get("/", async (req, res) => {
//   const username = await redis.get("username");
//   const password = await redis.get("password");
//   res.send(`Hello ${username} and password ${password}`);
// });



const fakeDB = {
  1: { id: 1, name: "Raju" },
  2: { id: 2, name: "Mohit" }
};

app.get("/users/:id", async (req, res) => {
  const key = `cache:user:${req.params.id}`;

  console.log("Key:", key);
  // 🛡️ Ensure correct type
  const type = await redis.type(key);
  if (type !== "string" && type !== "none") {
    await redis.del(key);
  }

  const cached = await redis.get(key);
  console.log("Cached:", cached);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const user = fakeDB[req.params.id];

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Store as string
  await redis.setEx(key, 60, JSON.stringify(user));

  res.json(user);
});


const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
