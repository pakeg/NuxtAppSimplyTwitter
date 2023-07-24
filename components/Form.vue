<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <div class="pt-5 space-y-6">
      <div class="space-y-6 h-[320px]" v-if="isHandleAction">
        <Input
          type="text"
          label="Username"
          v-model="data.username"
          placeholder="@username"
        />
        <Input
          type="password"
          label="Password"
          v-model="data.password"
          placeholder="@password"
        />
      </div>
      <div class="space-y-6 h-[320px]" v-else>
        <Input
          type="text"
          label="Username"
          v-model="data.username"
          placeholder="@username"
        />
        <Input
          type="password"
          label="Password"
          v-model="data.password"
          placeholder="@password"
        />
        <Input
          type="password"
          label="Password"
          v-model="data.repeatPassword"
          placeholder="@repeat password"
        />
        <Input
          type="email"
          label="Email"
          v-model="data.email"
          placeholder="@email"
        />
      </div>
      <Button
        liquid
        @click="handleLogin"
        :disabled="isButtonDisabled"
        @mouseenter="isHandleAction = true"
        >Login</Button
      >
      <Button
        liquid
        @click="handleRegister"
        :disabled="isButtonDisabled"
        @mouseenter="isHandleAction = false"
        >Register</Button
      >
    </div>
  </div>
</template>

<script setup>
const { login, registerUser } = useAuth();

const isHandleAction = ref(true);
const data = reactive({
  username: "",
  password: "",
  email: "",
  repeatPassword: "",
  loading: false,
});

async function handleLogin() {
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

const handleRegister = async () => {
  data.loading = true;

  try {
    await registerUser({
      username: data.username,
      password: data.password,
      email: data.email,
      repeatPassword: data.repeatPassword,
      name: data.email.split("@")[0],
    });
  } catch (error) {
  } finally {
    data.loading = false;
  }
};

const isButtonDisabled = computed(() => {
  return !data.username || !data.password || data.loading;
});
</script>
