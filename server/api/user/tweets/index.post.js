import formidable from "formidable";
import { createMediaFile } from "../../../dp/mediaFiles";
import { createTweet } from "../../../dp/tweets";
import { tweetTransformer } from "../../../transformers/tweet";
import { uploadToCloudinary } from "../../../utils/cloudinary";

export default defineEventHandler(async (event) => {
  const form = formidable({});
  const body = await readBody(event);

  const response = await new Promise((resolve, reject) => {
    form.parse(body, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  return { response, event };
  const userId = event.context?.auth?.user?.id;

  const tweetData = {
    text: fields.text,
    authorId: userId,
  };

  const replyTo = fields.replyTo;

  if (replyTo && replyTo !== "null" && replyTo !== "undefined") {
    tweetData.replyToId = replyTo;
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key];

    const cloudinaryResource = await uploadToCloudinary(file.filepath);

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});
