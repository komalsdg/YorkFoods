const prisma = require("prismaClient");
const config = require("config");
const { ExtractJwt, Strategy } = require("passport-jwt");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.sessionSecret,
};

module.exports.JwtStrategy = new Strategy(jwtOptions, async (payload, next) => {
  const { sessionId, user } = payload;
  const session = await prisma.session.findUnique({
    where: { id: sessionId, active: true },
  });
  if (session) {
    next(null, user);
  } else {
    next(null, false);
  }
});
