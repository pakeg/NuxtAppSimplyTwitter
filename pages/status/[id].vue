<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Status</Title>
      </Head>

      <TweetDetails :tweet="tweet" v-bind:user="user" />
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);
const tweet = ref(null);

const { useAuthUser } = useAuth();
const user = useAuthUser();

const { getTweetById } = useTweets();

const getTweetIdFromRoute = () => {
  return useRoute().params.id;
};

const getTweet = async () => {
  loading.value = true;
  try {
    const response = await getTweetById(getTweetIdFromRoute());
    tweet.value = response.tweet;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
onBeforeMount(() => {
  getTweet();
});

watch(
  () => useRoute().fullPath,
  () => getTweet()
);
</script>
