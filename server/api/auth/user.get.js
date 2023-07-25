import { userTransformer } from "../../transformers/users";
import { decodeAccessToken } from "../../utils/jwt";
import { getUserById } from "../../dp/users";

export default defineEventHandler(async (event) => {
  const token = event.node.req.headers["Authorization"];

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

  try {
    const user = await getUserById(token.userId);

    return { user: userTransformer(user) };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      })
    );
  }
});
