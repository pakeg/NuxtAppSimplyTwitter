import { getTweets } from "../../dp/tweets";
import { tweetTransformer } from "../../transformers/tweet";

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);

  let request;
  request = {
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true,
        },
      },
      replyTo: {
        include: {
          author: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };

  if (!!query) {
    request = {
      ...request,
      where: {
        text: {
          contains: query,
        },
      },
    };
  }
  const tweets = await getTweets(request);

  return {
    tweets: tweets.map(tweetTransformer),
  };
});
