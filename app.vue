<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 ms-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft
                @on-tweet="handleOpenTweetModal"
                :user="user"
                @on-logout="handleUserLogout"
              />
            </div>
          </div>

          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <NuxtPage />
          </main>

          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />
      <Modal :isOpen="postTweetModal" @on-close="handleModalClose">
        <TweetForm
          :user="user"
          @on-success="handleFormSuccess"
          :replyTo="replyTweet"
          show-reply
        />
      </Modal>
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false);

const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
const isAuthLoading = useAuthLoading();
const user = useAuthUser();

const {
  closePostTweetModal,
  usePostTweetModal,
  openPostTweetModal,
  useReplyTweet,
} = useTweets();
const postTweetModal = usePostTweetModal();
const replyTweet = useReplyTweet();

const emitter = useEmitter();

emitter.$on("replyTweet", (tweet) => {
  openPostTweetModal(tweet);
});

emitter.$on("toggleDarkMode", () => {
  darkMode.value = !darkMode.value;
});

const handleUserLogout = () => {
  logout();
};

const handleFormSuccess = (tweet) => {
  closePostTweetModal();

  navigateTo({
    path: "/status/" + tweet.id,
  });
};

const handleModalClose = () => {
  closePostTweetModal();
};

const handleOpenTweetModal = () => {
  openPostTweetModal();
};

onBeforeMount(async () => {
  let a = await initAuth();
  console.log(a);
});
</script>
