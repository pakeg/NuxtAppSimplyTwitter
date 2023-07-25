import { userTransformer } from "../../transformers/users";

export default defineEventHandler(async (event) => {
  return {
    user: event.context.auth,
    der: event.context.der,
  };
});
