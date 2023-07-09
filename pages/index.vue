<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home</Title>
      </Head>
      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" @on-success="handleFormSuccess" />
      </div>

      <TweetListFeed :tweets="homeTweets"></TweetListFeed>
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);
const homeTweets = ref([]);
const { twitterBorderColor } = useTailwindConfig();

const { getHomeTweets } = useTweets();
const { useAuthUser } = useAuth();

const user = useAuthUser();

onBeforeMount(async () => {
  loading.value = true;
  try {
    const { tweets } = await getHomeTweets();
    homeTweets.value = tweets;
  } catch (error) {
  } finally {
    loading.value = false;
  }
});

const handleFormSuccess = (tweet) => {
  navigateTo({
    path: "/status/" + tweet.id,
  });
};
</script>
