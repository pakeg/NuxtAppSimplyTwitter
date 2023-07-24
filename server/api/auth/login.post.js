import { sendError } from "h3";
import { getUserByUsername } from "../../dp/users";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "../../utils/jwt";
import { userTransformer } from "../../transformers/users";
import { createRefreshToken } from "../../dp/refreshTokens";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: { body, boDY: JSON.parse(body) },
      })
    );
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Credentials is invalid",
      })
    );
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Credentials is invalid",
      })
    );
  }

  const { accessToken, refreshToken } = generateTokens(user);

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  sendRefreshToken(event, refreshToken);

  return { access_token: accessToken, user: userTransformer(user) };
});
