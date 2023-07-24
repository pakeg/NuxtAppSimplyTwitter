import { userTransformer } from "../../transformers/users";

export default defineEventHandler(async (event) => {
  return send(event, getRequestURL(event), "json");
  return {
    user: userTransformer(event.context.auth?.user),
  };
});
