<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img
          :src="props.user?.profileImage"
          alt=""
          class="inline-block w-10 h-10 rounded-full"
        />
      </div>

      <div class="w-full p-2">
        <textarea
          v-model="text"
          class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
        ></textarea>
      </div>
    </div>

    <!--FILE PICK BLOCK -->
    <div class="p-4 pl-16">
      <input
        type="file"
        ref="imageInput"
        hidden
        accept="image/png,image/gif,image/jpeg"
        @change="handleImageChange"
      />
    </div>

    <!-- ICONS BLOCK-->
    <div class="flex p-2 pl-14">
      <div
        @click="handleImageClick"
        class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconImageFrame />
      </div>
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconGif />
      </div>
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconChart />
      </div>
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconEmoji />
      </div>
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconCalendar />
      </div>
    </div>

    <div>
      <button @click="handleFormSubmit">Tweet</button>
    </div>
  </div>
</template>

<script setup>
const text = ref("");
const imageInput = ref();
const selectedFile = ref(null);
const emits = defineEmits(["onSubmit"]);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const handleFormSubmit = () => {
  emits("onSubmit", {
    text: text.value,
    mediaFiles: [selectedFile.value]
  });
};

const handleImageClick = () => {
  imageInput.value.click();
};

const handleImageChange = (event) => {
  const file = event.target.files[0];

  selectedFile.value = file;
};
</script>
