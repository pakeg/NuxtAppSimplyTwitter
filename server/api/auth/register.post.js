import { sendError } from "h3";
import { createUser } from "../../dp/users";
import { userTransformer } from "../../transformers/users";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);

  const { username, email, password, repeatPasswor, name } = body;

  if (!username || !email || !password || !repeatPasswor || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  if (password !== repeatPasswor) {
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

  return {
    body: userTransformer(user),
  };
});
