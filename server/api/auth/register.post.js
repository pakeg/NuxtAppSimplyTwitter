import { sendError } from "h3";
import { createUser } from "../../dp/users";
import { userTransformer } from "../../transformers/users";
import { createRefreshToken } from "../../dp/refreshTokens";
import { generateTokens, sendRefreshToken } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password, repeatPassword, name } = body;

  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Password not matched" })
    );
  }

  const userData = {
    username,
    email,
    password,
    name,
    profileImage: "https://picsum.photos/200/200",
  };

  const user = await createUser(userData);

  const { accessToken, refreshToken } = generateTokens(user);

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  sendRefreshToken(event, refreshToken);

  return { access_token: accessToken, user: userTransformer(user) };
});
