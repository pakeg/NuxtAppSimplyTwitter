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
} from "@heroicons/vue/outline";

const { defaultTransition } = useTailwindConfig();
</script>
