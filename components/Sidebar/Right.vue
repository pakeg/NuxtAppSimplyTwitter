<template>
  <div class="flex flex-col">
    <!-- Search bar -->
    <div class="relative m-2">
      <div
        class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
      >
        <div class="w-6 h-6">
          <SearchIcon @click="handleSearch" />
        </div>
      </div>
      <input
        v-model="search"
        type="text"
        class="flex items-center w-full pl-12 text-sm text-black font-normal dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
        placeholder="Search tweet"
      />
    </div>

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

    <footer>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a
            @click.prevent="handleToggleDarkMode"
            href="#"
            class="hover:underline"
            >Dark mode</a
          >
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Privacy policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Cookie policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Ads info</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">More</a>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script setup>
import { SearchIcon } from "@vue-hero-icons/outline";
const search = ref("");
const emitter = useEmitter();

const handleSearch = () => {
  useRouter().push({
    path: "/search",
    query: {
      q: search.value,
    },
  });
};

const handleToggleDarkMode = () => {
  emitter.$emit("toggleDarkMode");
};

// simple data
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
