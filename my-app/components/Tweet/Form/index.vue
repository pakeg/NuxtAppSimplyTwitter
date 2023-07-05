<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <Spinner />
    </div>
    <div v-else>
      <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
    </div>
  </div>
</template>

<script setup>
const { postTweet } = useTweets();
const loading = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const handleFormSubmit = async (data) => {
  loading.value = true;
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    });
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>
