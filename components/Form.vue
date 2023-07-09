<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="pt-5 space-y-6">
      <Input
        type="text"
        label="Username"
        v-model="data.username"
        :placeholder="@username"
      />
      <Input
        type="password"
        label="Password"
        v-model="data.password"
        :placeholder="@password"
      />
      <Button liquid @click="handleLogin" :disabled="isButtonDisabled"
        >Login</Button
      >
    </div>
  </div>
</template>

<script setup>
const data = reactive({
  username: "",
  password: "",
  loading: false,
});

async function handleLogin() {
  const { login } = useAuth();
  data.loading = true;

  try {
    await login({
      username: data.username,
      password: data.password,
    });
  } catch (error) {
  } finally {
    data.loading = false;
  }
}

const isButtonDisabled = computed(() => {
  return !data.username || !data.password || data.loading;
});
</script>
