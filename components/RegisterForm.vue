<template>
  <div>
    <form action="" @submit.prevent="onSubmit">
      <input type="text" name="name" v-model="name" :disabled="isLoading" label="Name">
      <input type="email" name="email" v-model="email" :disabled="isLoading" label="Email">
      <input type="password" name="password" v-model="password" :disabled="isLoading" label="Password">
      <button :disabled="isLoading" type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref(false)

const name = ref('')
const password = ref('')
const email = ref('')


const onSubmit = async () => {
  try {
    isLoading.value = true
    const { data, error } = await useFetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: name.value,
        password: password.value,
        email: email.value,
      },
    })
    if (error.value) {
      console.log(error.value)
    }
    if (data.value) {
      console.log('Successfully Registered')
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
}
</script>