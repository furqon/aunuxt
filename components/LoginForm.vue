<template>
  <div>
    <form action="" @submit.prevent="onSubmit">
      <input type="email" name="email" v-model="email" :disabled="isLoading" label="Email">
      <input type="password" name="password" v-model="password" :disabled="isLoading" label="Password">
      <button :disabled="isLoading" type="submit">Login</button>
      <hr />
      or login with
      <button :disabled="isLoading" type="button" @click="googleLogin()">google</button>
      <button :disabled="isLoading" type="button" @click="githubLogin()">github</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const { signIn } = useAuth()
const isLoading = ref(false)

const password = ref('')
const email = ref('')

const onSubmit = async () => {
  try {
    isLoading.value = true;

    const result = await signIn('credentials', {
      password: password.value,
      email: email.value,
      redirect: false,
    });
    if (result?.ok && !result.error) {
      console.log('Successfully LoggedIn');
    } else {
      console.log('Something Weent Wrong');
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
}

const githubLogin = async() => {
  signIn('github', {redirect: false})
}
const googleLogin = async() => {
  signIn('google', {redirect: false})
}
</script>