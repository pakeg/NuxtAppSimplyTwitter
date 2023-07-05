<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue">
      <template #icon="{ classes }">
        <ChatIcon :class="classes" />
      </template>
      <template #default> {{ props.tweet.repliesCount }} </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green">
      <template #icon="{ classes }">
        <RefreshIcon :class="classes" />
      </template>
      <template #default> {{ generateRandomNumber }} </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red">
      <template #icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>
      <template #default> {{ generateRandomNumber }} </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="yellow">
      <template #icon="{ classes }">
        <UploadIcon :class="classes" />
      </template>
      <template #default> {{ generateRandomNumber }} </template>
    </TweetItemActionsIcon>
  </div>
</template>
<script setup>
import {
  ChatIcon,
  RefreshIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/vue/outline";

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
});

const generateRandomNumber = computed(() => {
  return Math.floor(Math.random() * 100);
});
</script>
