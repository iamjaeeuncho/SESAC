const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const users = require("../users");

const kakaoStrategyCallback = (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  console.log(profile);

  let user = users.find((u) => u.username === profile.id);

  if (!user) {
    user = {
      id: profile.id,
      username: profile.username,
      email: profile.account_email,
      provider: "kakao",
    };
    users.push(user);
  }

  req.session.user = user;

  return done(null, profile);
};

passport.use(
  new KakaoStrategy(
    {
      passReqToCallback: true,
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/kakao/callback",
    },
    kakaoStrategyCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = (app) => {
  app.get("/auth/kakao", passport.authenticate("kakao"));

  app.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", {
      failureRedirect: "/",
    }),
    (req, res) => {
      req.flash("success", "Kakao 로그인 성공");
      res.redirect("/dashboard");
    }
  );
};
