import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";
import { sendError } from "h3";
import { getUserById } from "../dp/users";

export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/auth/user",
    "/api/user/tweets",
    "/api/tweets",
    "/api/tweets/:id",
    "/api/auth/refresh",
  ];

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.node.res.url);
  });

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token = event.node.req.headers["authorization"];

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
    const user = await getUserById(decoded.userId);

    event.context.auth = { ...user };
  } catch (error) {
    return;
  }
});
