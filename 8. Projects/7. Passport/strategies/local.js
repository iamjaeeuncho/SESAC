const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const users = require("../users");

const LocalStrategyCallback = (username, password, done) => {
  console.log(`로컬 인증 진행: `, username, password);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    console.log(`로그인 실패`);
    return done(null, false, { message: `id/pw가 잘못 되었습니다` });
  }

  console.log("사용자 발견:", user);
  return done(null, user, { message: "로그인 성공" });
};

passport.use(new LocalStrategy(LocalStrategyCallback));

module.exports = (app) => {
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      successFlash: true,
      failureRedirect: "/",
      failureFlash: true,
    })
  );
};
