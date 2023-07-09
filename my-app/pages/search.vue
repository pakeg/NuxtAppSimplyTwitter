<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <Title>Search</Title>
      </Head>

      <TweetListFeed :tweets="searchTweets"></TweetListFeed>
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);
const searchTweets = ref([]);
const searchQuery = useRoute().query.q;

const { getSearchTweets } = useTweets();

onBeforeMount(async () => {
  getSearchTweet();
});

const getSearchTweet = async () => {
  loading.value = true;
  try {
    const { tweets } = await getSearchTweets({
      query: searchQuery,
    });
    searchTweets.value = tweets;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

watch(
  () => useRoute().fullPath,
  () => getSearchTweet()
);
</script>
