import { userTransformer } from "../../transformers/users";
import { send, getRequestURL } from "h3";

export default defineEventHandler(async (event) => {
  return send(event, getRequestURL(event), "json");
  return {
    user: userTransformer(event.context.auth?.user),
  };
});
