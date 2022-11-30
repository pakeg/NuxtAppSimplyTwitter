<template>
  <div class="flex flex-col">
    <SidebarPreviewCard title="What's happening">
      <SidebarItem v-for="whatsHappeningItem in whatsHappeningItems">
        <div class="flex flex-row justify-between p-2">
          >
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappeningItem.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ whatsHappeningItem.count }}</p>
        </div>
      </SidebarItem>
    </SidebarPreviewCard>

    <SidebarPreviewCard title="Who to follow">
      <SidebarItem v-for="whoToFollowItem in whoToFollowItems">
        <div class="flex flex-row justify-between items-center p-2">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="whoToFollowItem.image"
              :alt="whoToFollowItem.name"
            />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollowItem.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ whoToFollowItem.handle }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 text-xs font-bold text-white bg-black dark:text-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarItem>
    </SidebarPreviewCard>
  </div>
</template>
<script setup>
const whatsHappeningItems = ref([
  {
    title: "SpaceX",
    count: "19k Tweets",
  },
  {
    title: "Clone",
    count: "12k Tweets",
  },
  {
    title: "Closure",
    count: "19k Tweets",
  },
]);

const whoToFollowItems = ref([
  {
    name: "Baiden",
    handle: "@Biden",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Baiden",
    handle: "@Biden",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Baiden",
    handle: "@Biden",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Baiden",
    handle: "@Biden",
    image: "https://picsum.photos/200/200",
  },
]);
</script>
