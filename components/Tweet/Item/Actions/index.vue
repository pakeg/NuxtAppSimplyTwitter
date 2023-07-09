<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon
      color="blue"
      :size="size"
      @on-click="emits('onCommentClick')"
    >
      <template #icon="{ classes }">
        <ChatIcon :class="classes" />
      </template>
      <template #default v-if="showStats">
        {{ props.tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template #icon="{ classes }">
        <RefreshIcon :class="classes" />
      </template>
      <template #default v-if="showStats">
        {{ generateRandomNumber }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red" :size="size">
      <template #icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>
      <template #default v-if="showStats">
        {{ generateRandomNumber }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="yellow" :size="size">
      <template #icon="{ classes }">
        <UploadIcon :class="classes" />
      </template>
      <template #default v-if="showStats">
        {{ generateRandomNumber }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>
<script setup>
import {
  ChatIcon,
  RefreshIcon,
  HeartIcon,
  UploadIcon,
} from "@vue-hero-icons/outline";

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits("onCommentClick");

const showStats = computed(() => props.compact);
const size = computed(() => (props.compact ? 5 : 8));

const generateRandomNumber = computed(() => {
  return Math.floor(Math.random() * 100);
});
</script>
