import { userTransformer } from "../../transformers/users";

export default defineEventHandler((event) => {
  return {
    user: userTransformer(event.context.auth?.user),
  };
});
