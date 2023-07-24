import { removeRefreshToken } from "../../dp/refreshTokens";
import { sendRefreshToken } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event);
    const refreshToken = cookies.refresh_token;

    await removeRefreshToken(refreshToken);
    sendRefreshToken(event.res, null);

    return {
      message: "Done",
    };
  } catch (error) {
    return {
      message: "Fail",
    };
  }
});
