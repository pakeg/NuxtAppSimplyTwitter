import { userTransformer } from "../../transformers/users";
import { decodeAccessToken } from "../../utils/jwt";
import { getUserById } from "../../dp/users";

export default defineEventHandler(async (event) => {
  const token = getHeader(event, "Authorization");

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }

  const user = await getUserById(token.userId);

  return { user: userTransformer(user) };
});
