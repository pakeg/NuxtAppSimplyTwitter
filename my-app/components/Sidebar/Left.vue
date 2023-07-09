<template>
  <div class="flex flex-col h-screen">
    <div
      class="p-2 my-2 hover:bg-blue-500 rounded-full w-min dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarTab>
        <template #icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarTab>

      <SidebarTab>
        <template #icon>
          <HashtagIcon />
        </template>
        <template v-slot:name> Explore </template>
      </SidebarTab>

      <SidebarTab>
        <template #icon>
          <BellIcon />
        </template>
        <template v-slot:name> Notification </template>
      </SidebarTab>

      <SidebarTab>
        <template #icon>
          <InboxIcon />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarTab>

      <SidebarTab>
        <template #icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name> Bookmarks </template>
      </SidebarTab>

      <SidebarTab>
        <template #icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> Lists </template>
      </SidebarTab>

      <SidebarTab>
        <template #icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarTab>

      <SidebarTab>
        <template #icon>
          <DotsCircleHorizontalIcon />
        </template>
        <template v-slot:name> More </template>
      </SidebarTab>

      <div class="hidden xl:block">
        <Button liquid size="lg" @on-click="emits('onTweet')"
          ><span class="font-bold">Tweet</span></Button
        >
      </div>
      <div class="xl:hidden block">
        <Button @on-click="emits('onTweet')"
          ><div class="w-6 h-6 font-bold"><PencilIcon /></div
        ></Button>
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:bg-dim-800"
      :class="defaultTransition"
      @click="emits('onLogout')"
    >
      <div class="flex flex-row">
        <img :src="props.user.profileImage" class="w-10 h-10 rounded-full" />
        <div class="flex-col hidden ml-2 xl:block">
          <h1 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ props.user.name }}
          </h1>
          <p class="text-sm text-gray-400">{{ props.user.handle }}</p>
        </div>
      </div>

      <div class="hidden ml-auto xl:block">
        <div class="w-6 h-6">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon } from "@heroicons/vue/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  PencilIcon,
  ChevronDownIcon,
} from "@heroicons/vue/outline";

const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["onTweet", "onLogout"]);
</script>
