import { userTransformer } from "../../transformers/users";

export default defineEventHandler((event) => {
  return {
    user: event.context.auth,
    der: event.context.der,
  };
});
