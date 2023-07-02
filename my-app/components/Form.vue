<template>
  <div class="pt-5 space-y-6">
    <Input
      type="text"
      label="Username"
      v-model="username"
      :placeholder="@username"
    />
    <Input
      type="password"
      label="Password"
      v-model="password"
      :placeholder="@password"
    />
    <div>
      <button @click="handleLogin">Login</button>
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
</script>
