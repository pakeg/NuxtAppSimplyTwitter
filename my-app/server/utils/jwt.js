import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const { jwtAccessSecret } = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, jwtAccessSecret, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (user) => {
  const { jwtRefreshSecret } = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, jwtRefreshSecret, {
    expiresIn: "4h",
  });
};

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const sendRefreshToken = (event, token) => {
  setCookie(event.res, "refresh_token", token, {
    httpOnly: true,
    sameSite: true,
  });
};
