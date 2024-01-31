const debug = require("debug");

// const debugN = debug("gen:name");
// const debugO = debug("gen:order");
// const debugS = debug("gen:store");

const debugR = new debug("gen:root");
const debugU = new debug("gen:user");
const debugA = new debug("gen:admin");
const debugS = new debug("gen:server");

function enableDebug(debugInstance, condition) {
  if (condition !== undefined) {
    if (condition === "1") {
      debugInstance.enabled = true;
    } else if (condition === "0") {
      debugInstance.enabled = false;
    }
  }
}

// 디버그 URL를 미들웨어를 통해서 설정
function setupDebugMiddleware(app) {
  // 미들웨어를 통해 우선순위가 높게 설정
  app.use("/debug", (req, res, next) => {
    const { server, user, admin, root } = req.query;

    // 파라미터를 통해 디버그 상태를 동적으로 변경
    enableDebug(debugS, server);
    enableDebug(debugR, root);
    enableDebug(debugU, user);
    enableDebug(debugA, admin);

    res.json({
      server: debugS.enabled ? 1 : 0,
      root: debugR.enabled ? 1 : 0,
      user: debugU.enabled ? 1 : 0,
      admin: debugA.enabled ? 1 : 0,
    });
  });
}

module.exports = {
  debugR,
  debugU,
  debugA,
  debugS,
  setupDebugMiddleware,
};
