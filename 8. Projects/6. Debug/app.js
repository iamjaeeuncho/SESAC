const express = require("express");
const {
  debugR,
  debugU,
  debugA,
  debugS,
  setupDebugMiddleware,
} = require("./debug");

const app = express();
const port = 3000;

setupDebugMiddleware(app);

app.get("/", (req, res) => {
  debugR("helloR");
  res.send("root");
});

app.get("/user", (req, res) => {
  debugU("helloU");
  res.send("user");
});

app.get("/admin", (req, res) => {
  debugA("helloA");
  res.send("admin");
});

// app.get("/debug", (req, res) => {
//   const { server, root, user, admin } = req.query;

//   if (server !== undefined) {
//     if (debugS.enabled === 1) {
//       debugS.enabled();
//     } else {
//       debugS.disabled();
//     }
//   }

//   if (root !== undefined) {
//     if (debugR.enabled === 1) {
//       debugR.enabled();
//     } else {
//       debugR.disabled();
//     }
//   }

//   if (user !== undefined) {
//     if (debugU.enabled === 1) {
//       debugU.enabled();
//     } else {
//       debugU.disabled();
//     }
//   }

//   if (admin !== undefined) {
//     if (debugA.enabled === 1) {
//       debugA.enabled();
//     } else {
//       debugA.disabled();
//     }
//   }
//   // debugA.enabled = 1;
//   // debugU.enabled = 1;
//   // debugR.enabled = 0;

//   res.send(
//     `디버그 모드 - 서버: ${debugS.enabled}, 루트: ${debugR.enabled}, 유저: ${debugU.enabled}, 어드민: ${debugA.enabled}`
//   );
// });

app.listen(port, () => {
  debugS("helloS");
  console.log(`${port}포트 서버 연결`);
});
